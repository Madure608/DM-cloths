import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createTShirt,
  deleteTShirt,
  fetchOrderIntents,
  fetchTShirts,
  updateTShirt,
} from "../../api/admin";

const sizeOptions = ["S", "M", "L", "XL"];

const emptyForm = {
  color: "",
  price: "",
  imageFile: null,
  imagePreview: "",
  sizes: sizeOptions.map((size) => ({ size, stock: "", enabled: false })),
};

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
  const [intentFilter, setIntentFilter] = useState("all");
  const [search, setSearch] = useState("");

  const pendingCount = intents.filter((intent) => intent.status === "pending")
    .length;
  const totalInventory = tshirts.length;
  const totalIntents = intents.length;

  const filteredIntents = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    return intents.filter((intent) => {
      if (intentFilter !== "all" && intent.status !== intentFilter) {
        return false;
      }

      if (!normalized) return true;

      const haystack = [
        intent.customerName,
        intent.phoneNumber,
        intent.selectedColor,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [intents, intentFilter, search]);

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
    const sizesAvailable = form.sizes
      .filter((entry) => entry.enabled)
      .map((entry) => ({
        size: entry.size,
        stock: Number.parseInt(entry.stock, 10),
      }))
      .filter((entry) => !Number.isNaN(entry.stock));

    const price = Number.parseFloat(form.price);

    if (!form.color.trim()) {
      throw new Error("Color is required");
    }

    if (Number.isNaN(price) || price < 0) {
      throw new Error("Price must be a valid number");
    }

    if (sizesAvailable.length === 0) {
      throw new Error("Select at least one size with stock");
    }

    if (!editingId && !form.imageFile) {
      throw new Error("Please upload an image");
    }

    return {
      color: form.color.trim(),
      price,
      sizesAvailable,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setSaving(true);

    try {
      const payload = buildPayload();
      const formData = new FormData();
      formData.append("color", payload.color);
      formData.append("price", String(payload.price));
      formData.append("sizesAvailable", JSON.stringify(payload.sizesAvailable));
      if (form.imageFile) {
        formData.append("image", form.imageFile);
      }
      if (editingId) {
        await updateTShirt(editingId, formData);
        setMessage("T-shirt updated.");
      } else {
        await createTShirt(formData);
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
      imageFile: null,
      imagePreview: tshirt.imageUrl || "",
      sizes: sizeOptions.map((size) => {
        const match = tshirt.sizesAvailable.find((entry) => entry.size === size);
        return match
          ? { size, stock: String(match.stock), enabled: true }
          : { size, stock: "", enabled: false };
      }),
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

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Inventory", value: totalInventory },
            { label: "Order intents", value: totalIntents },
            { label: "Pending", value: pendingCount },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-3xl border border-stone/40 bg-white/80 p-4 shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-clay">
                {card.label}
              </p>
              <p className="mt-3 text-2xl font-semibold text-ink">
                {card.value}
              </p>
            </div>
          ))}
        </div>

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
              <div className="grid gap-3">
                <p className="text-sm text-clay">Sizes & stock</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {form.sizes.map((entry, index) => (
                    <label
                      key={entry.size}
                      className="flex items-center justify-between rounded-2xl border border-stone/40 bg-white px-4 py-3 text-sm"
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={entry.enabled}
                          onChange={(event) => {
                            const updated = [...form.sizes];
                            updated[index] = {
                              ...updated[index],
                              enabled: event.target.checked,
                            };
                            setForm({ ...form, sizes: updated });
                          }}
                        />
                        {entry.size}
                      </span>
                      <input
                        className="h-9 w-24 rounded-xl border border-stone/40 bg-white px-3 text-xs"
                        value={entry.stock}
                        onChange={(event) => {
                          const updated = [...form.sizes];
                          updated[index] = {
                            ...updated[index],
                            stock: event.target.value,
                          };
                          setForm({ ...form, sizes: updated });
                        }}
                        placeholder="Stock"
                        type="number"
                        min="0"
                        disabled={!entry.enabled}
                      />
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                <label className="grid gap-2 text-sm">
                  <span className="text-clay">Image upload</span>
                  <input
                    className="h-11 rounded-2xl border border-dashed border-stone/50 bg-sand/70 px-4 text-sm"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0] || null;
                      const preview = file
                        ? URL.createObjectURL(file)
                        : form.imagePreview;
                      setForm({ ...form, imageFile: file, imagePreview: preview });
                    }}
                  />
                </label>
                {form.imagePreview && (
                  <img
                    src={form.imagePreview}
                    alt="T-shirt preview"
                    className="h-32 w-full rounded-2xl border border-stone/30 object-cover"
                  />
                )}
              </div>

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
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          {tshirt.imageUrl ? (
                            <img
                              src={tshirt.imageUrl}
                              alt={tshirt.color}
                              className="h-16 w-16 rounded-2xl border border-stone/30 object-cover"
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-2xl border border-stone/30 bg-sand" />
                          )}
                          <div>
                            <p className="text-sm font-semibold text-ink">
                              {tshirt.color}
                            </p>
                            <p className="text-xs text-clay">
                              Rs. {tshirt.price} |{" "}
                              {tshirt.sizesAvailable
                                .map((entry) => `${entry.size}:${entry.stock}`)
                                .join(", ")}
                            </p>
                          </div>
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
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <label className="text-xs uppercase tracking-[0.2em] text-clay">
                Status
                <select
                  className="mt-2 h-10 rounded-2xl border border-stone/40 bg-white px-3 text-xs"
                  value={intentFilter}
                  onChange={(event) => setIntentFilter(event.target.value)}
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </label>
              <label className="text-xs uppercase tracking-[0.2em] text-clay">
                Search
                <input
                  className="mt-2 h-10 rounded-2xl border border-stone/40 bg-white px-3 text-xs"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Name, phone, color"
                />
              </label>
            </div>
            <div className="mt-6 grid gap-4">
              {loading ? (
                <p className="text-sm text-clay">Loading intents...</p>
              ) : filteredIntents.length === 0 ? (
                <p className="text-sm text-clay">No intents yet.</p>
              ) : (
                filteredIntents.map((intent) => (
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
