import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createTShirt,
  deleteTShirt,
  fetchOrderIntents,
  fetchTShirts,
  updateTShirt,
} from "../../api/admin";

const emptyForm = {
  color: "",
  price: "",
  imageUrl: "",
  sizesText: "",
};

const parseSizesText = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((entry) => {
      const [sizeRaw, stockRaw] = entry.split(":").map((part) => part.trim());
      const stock = Number.parseInt(stockRaw, 10);
      if (!sizeRaw || Number.isNaN(stock)) return null;
      return { size: sizeRaw.toUpperCase(), stock: Math.max(0, stock) };
    })
    .filter(Boolean);

const formatSizes = (sizesAvailable = []) =>
  sizesAvailable
    .map((entry) => `${entry.size}:${entry.stock}`)
    .join(", ");

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = useMemo(
    () => localStorage.getItem("dm_admin_token"),
    []
  );
  const [tshirts, setTshirts] = useState([]);
  const [intents, setIntents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [tshirtData, intentData] = await Promise.all([
        fetchTShirts(),
        fetchOrderIntents(),
      ]);
      setTshirts(tshirtData);
      setIntents(intentData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  const buildPayload = () => {
    const sizesAvailable = parseSizesText(form.sizesText);
    const price = Number.parseFloat(form.price);

    if (!form.color.trim()) {
      throw new Error("Color is required");
    }

    if (Number.isNaN(price) || price < 0) {
      throw new Error("Price must be a valid number");
    }

    if (sizesAvailable.length === 0) {
      throw new Error("Sizes must be in format S:10, M:5");
    }

    return {
      color: form.color.trim(),
      price,
      imageUrl: form.imageUrl.trim(),
      sizesAvailable,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setSaving(true);

    try {
      const payload = buildPayload();
      if (editingId) {
        await updateTShirt(editingId, payload);
        setMessage("T-shirt updated.");
      } else {
        await createTShirt(payload);
        setMessage("T-shirt added.");
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadData();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (tshirt) => {
    setEditingId(tshirt._id);
    setForm({
      color: tshirt.color,
      price: String(tshirt.price),
      imageUrl: tshirt.imageUrl || "",
      sizesText: formatSizes(tshirt.sizesAvailable),
    });
  };

  const handleDelete = async (tshirt) => {
    const confirmed = window.confirm(
      `Delete ${tshirt.color} T-shirt from inventory?`
    );
    if (!confirmed) return;

    try {
      await deleteTShirt(tshirt._id);
      await loadData();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("dm_admin_token");
    navigate("/admin/login");
  };

  if (!token) {
    return (
      <main className="min-h-screen bg-sand px-6 py-12 text-ink">
        <section className="mx-auto w-full max-w-xl rounded-3xl border border-stone/40 bg-white/80 p-8 shadow-sm">
          <h1 className="font-display text-3xl">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-clay">
            Please sign in to access inventory controls.
          </p>
          <button
            type="button"
            className="mt-6 h-11 rounded-full bg-ink px-6 text-sm font-semibold uppercase tracking-[0.2em] text-sand"
            onClick={() => navigate("/admin/login")}
          >
            Go to login
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-sand px-6 py-12 text-ink">
      <section className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase tracking-[0.3em] text-clay">Admin</p>
            <h1 className="font-display text-3xl sm:text-4xl">Dashboard</h1>
          </div>
          <button
            type="button"
            className="h-10 rounded-full border border-clay px-5 text-xs font-semibold uppercase tracking-[0.2em]"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>

        {error && (
          <p className="mt-6 rounded-2xl border border-ember/40 bg-ember/10 px-4 py-2 text-sm text-ember">
            {error}
          </p>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-stone/40 bg-white/70 p-6 shadow-sm">
            <h2 className="font-display text-2xl">Inventory</h2>
            <p className="mt-2 text-sm text-clay">
              Add or update T-shirt stock and sizes.
            </p>

            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="text-clay">Color</span>
                  <input
                    className="h-11 rounded-2xl border border-stone/40 bg-white px-4 text-sm"
                    value={form.color}
                    onChange={(event) =>
                      setForm({ ...form, color: event.target.value })
                    }
                    placeholder="Ivory"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  <span className="text-clay">Price (Rs.)</span>
                  <input
                    className="h-11 rounded-2xl border border-stone/40 bg-white px-4 text-sm"
                    value={form.price}
                    onChange={(event) =>
                      setForm({ ...form, price: event.target.value })
                    }
                    placeholder="1200"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm">
                <span className="text-clay">Sizes & stock</span>
                <input
                  className="h-11 rounded-2xl border border-stone/40 bg-white px-4 text-sm"
                  value={form.sizesText}
                  onChange={(event) =>
                    setForm({ ...form, sizesText: event.target.value })
                  }
                  placeholder="S:10, M:8, L:5"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="text-clay">Image URL</span>
                <input
                  className="h-11 rounded-2xl border border-stone/40 bg-white px-4 text-sm"
                  value={form.imageUrl}
                  onChange={(event) =>
                    setForm({ ...form, imageUrl: event.target.value })
                  }
                  placeholder="https://..."
                />
              </label>

              {message && (
                <p className="rounded-2xl border border-stone/40 bg-sand px-4 py-2 text-sm text-clay">
                  {message}
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="h-11 rounded-full bg-ink px-6 text-xs font-semibold uppercase tracking-[0.2em] text-sand"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update tee"
                    : "Add tee"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="h-11 rounded-full border border-clay px-6 text-xs font-semibold uppercase tracking-[0.2em]"
                    onClick={() => {
                      setEditingId(null);
                      setForm(emptyForm);
                    }}
                  >
                    Cancel edit
                  </button>
                )}
              </div>
            </form>

            <div className="mt-8 grid gap-4">
              {loading ? (
                <p className="text-sm text-clay">Loading inventory...</p>
              ) : tshirts.length === 0 ? (
                <p className="text-sm text-clay">No T-shirts yet.</p>
              ) : (
                tshirts.map((tshirt) => (
                  <div
                    key={tshirt._id}
                    className="rounded-2xl border border-stone/30 bg-white px-4 py-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {tshirt.color}
                        </p>
                        <p className="text-xs text-clay">
                          Rs. {tshirt.price} | {formatSizes(tshirt.sizesAvailable)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-full border border-clay px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
                          onClick={() => handleEdit(tshirt)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-ember/40 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ember"
                          onClick={() => handleDelete(tshirt)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-stone/40 bg-white/70 p-6 shadow-sm">
            <h2 className="font-display text-2xl">Order Intents</h2>
            <p className="mt-2 text-sm text-clay">
              Customers who clicked checkout.
            </p>
            <div className="mt-6 grid gap-4">
              {loading ? (
                <p className="text-sm text-clay">Loading intents...</p>
              ) : intents.length === 0 ? (
                <p className="text-sm text-clay">No intents yet.</p>
              ) : (
                intents.map((intent) => (
                  <div
                    key={intent._id}
                    className="rounded-2xl border border-stone/30 bg-white px-4 py-3"
                  >
                    <div className="flex flex-col gap-2 text-xs text-clay">
                      <p className="text-sm font-semibold text-ink">
                        {intent.customerName || "Customer"}
                      </p>
                      <p>
                        {intent.selectedColor} | {intent.selectedSize} | Rs.{" "}
                        {intent.selectedTShirtId?.price || "-"}
                      </p>
                      <p>Phone: {intent.phoneNumber || "-"}</p>
                      <a
                        href={intent.uploadedStickerUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ember"
                      >
                        View sticker
                      </a>
                      <p className="uppercase tracking-[0.2em]">
                        Status: {intent.status}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
