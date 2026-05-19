import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchTShirts, createOrderIntent } from "../api/user";
import { setCart } from "../store/cartSlice";

const Customize = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const preselected = location.state?.tshirt || null;
  const [tshirts, setTshirts] = useState([]);
  const [selectedId, setSelectedId] = useState(preselected?._id || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stickerFile, setStickerFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "" });
  const [loadingStock, setLoadingStock] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTShirts();
        setTshirts(data);
      } finally {
        setLoadingStock(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!stickerFile) {
      setPreview("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(stickerFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [stickerFile]);

  const selectedTShirt = useMemo(
    () => tshirts.find((item) => item._id === selectedId) || preselected,
    [tshirts, selectedId, preselected]
  );

  const sizesAvailable = selectedTShirt?.sizesAvailable || [];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });

    if (!selectedTShirt || !selectedSize) {
      setStatus({
        loading: false,
        error: "Please select a T-shirt and size.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("customerName", customerName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("selectedTShirtId", selectedTShirt._id);
      formData.append("selectedColor", selectedTShirt.color);
      formData.append("selectedSize", selectedSize);
      if (stickerFile) {
        formData.append("sticker", stickerFile);
      }

      const response = await createOrderIntent(formData);
      const payload = {
        tshirtId: selectedTShirt._id,
        color: selectedTShirt.color,
        size: selectedSize,
        price: selectedTShirt.price,
        stickerUrl: response.uploadedStickerUrl || "",
        orderIntentId: response.orderIntent?._id,
        customerName,
        phoneNumber,
      };

      sessionStorage.setItem("dm_cart", JSON.stringify(payload));
      dispatch(setCart(payload));
      navigate("/cart", { state: payload });
    } catch (err) {
      setStatus({ loading: false, error: err.message });
      return;
    }

    setStatus({ loading: false, error: "" });
  };

  return (
    <main className="min-h-screen bg-mist px-6 py-12 text-ink">
      <section className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-4xl sm:text-5xl">Customize</h1>
          <p className="max-w-xl text-base text-slate">
            Select a T-shirt color and size, then upload your sticker.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            className="rounded-3xl border border-borderSoft bg-white p-8 shadow-sm"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm">
                <span className="text-slate">Pick a color</span>
                <select
                  className="h-11 rounded-2xl border border-borderSoft bg-white px-4 text-sm"
                  value={selectedId}
                  onChange={(event) => {
                    setSelectedId(event.target.value);
                    setSelectedSize("");
                  }}
                  disabled={loadingStock}
                  required
                >
                  <option value="">Select a T-shirt</option>
                  {tshirts.map((tshirt) => (
                    <option key={tshirt._id} value={tshirt._id}>
                      {tshirt.color} - Rs. {tshirt.price}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm">
                <span className="text-slate">Pick a size</span>
                <div className="flex flex-wrap gap-2">
                  {sizesAvailable.length === 0 && (
                    <span className="text-xs text-slate">
                      Select a T-shirt to view sizes.
                    </span>
                  )}
                  {sizesAvailable.map((entry) => (
                    <button
                      key={`${entry.size}-${entry.stock}`}
                      type="button"
                      className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
                        selectedSize === entry.size
                          ? "border-brandOrange bg-brandOrange text-white"
                          : "border-borderSoft text-ink"
                      }`}
                      onClick={() => setSelectedSize(entry.size)}
                      disabled={entry.stock === 0}
                    >
                      {entry.size}
                    </button>
                  ))}
                </div>
              </label>

              <label className="grid gap-2 text-sm">
                <span className="text-slate">Your name (optional)</span>
                <input
                  className="h-11 rounded-2xl border border-borderSoft bg-white px-4 text-sm"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Your name"
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="text-slate">Phone number (optional)</span>
                <input
                  className="h-11 rounded-2xl border border-borderSoft bg-white px-4 text-sm"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  placeholder="+94..."
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="text-slate">Upload sticker (optional)</span>
                <input
                  className="h-11 rounded-2xl border border-dashed border-borderSoft bg-brandOrangeSoft/40 px-4 text-sm"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setStickerFile(event.target.files?.[0])}
                />
              </label>

              {status.error && (
                <p className="rounded-2xl border border-brandOrange/30 bg-brandOrangeSoft px-4 py-2 text-sm text-brandOrange">
                  {status.error}
                </p>
              )}

              <button
                type="submit"
                className="h-11 rounded-full bg-brandOrange px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                disabled={status.loading}
              >
                {status.loading ? "Uploading..." : "Save & continue"}
              </button>
            </div>
          </form>

          <div className="rounded-3xl border border-borderSoft bg-white p-8 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-slate">
              Preview
            </p>
            <div className="mt-4 rounded-3xl border border-dashed border-borderSoft bg-brandOrangeSoft/40 p-6">
              {preview ? (
                <img
                  src={preview}
                  alt="Sticker preview"
                  className="mx-auto max-h-60 rounded-2xl object-contain"
                />
              ) : (
                <p className="text-sm text-slate">
                  Upload a sticker to see it here.
                </p>
              )}
            </div>
            {selectedTShirt && (
              <div className="mt-6 grid gap-2 text-sm text-slate">
                <p className="text-ink">{selectedTShirt.color}</p>
                <p>Selected size: {selectedSize || "-"}</p>
                <p>Price: Rs. {selectedTShirt.price}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Customize;
