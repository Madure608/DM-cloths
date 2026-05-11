import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const storedCart = useSelector((state) => state.cart.item);
  const [error, setError] = useState("");
  const stored = useMemo(() => {
    const raw = sessionStorage.getItem("dm_cart");
    return raw ? JSON.parse(raw) : null;
  }, []);

  const cart = location.state || storedCart || stored;
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

  const handleCheckout = () => {
    if (!whatsappNumber) {
      setError("WhatsApp number is missing in environment settings.");
      return;
    }

    if (!cart) {
      setError("Cart data is missing.");
      return;
    }

    const message =
      "Hello DM CLOTHS! I want to order: " +
      `T-Shirt Color: ${cart.color}, ` +
      `Size: ${cart.size}, ` +
      `Sticker Link: ${cart.stickerUrl}, ` +
      `Total: Rs.${cart.price}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.location.href = url;
  };

  return (
    <main className="min-h-screen bg-sand px-6 py-12 text-ink">
      <section className="mx-auto w-full max-w-6xl">
        <h1 className="font-display text-3xl sm:text-4xl">Cart</h1>
        <p className="mt-3 max-w-xl text-base text-clay">
          Review your customized tee before WhatsApp checkout.
        </p>

        {!cart ? (
          <div className="mt-8 rounded-3xl border border-stone/40 bg-white/70 p-8 shadow-sm">
            <p className="text-sm text-clay">Your cart is empty.</p>
            <button
              type="button"
              className="mt-6 h-11 rounded-full bg-ink px-6 text-xs font-semibold uppercase tracking-[0.2em] text-sand"
              onClick={() => navigate("/customize")}
            >
              Start customizing
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-stone/40 bg-white/70 p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-clay">
                  Selection
                </p>
                <span className="text-sm font-semibold text-ink">
                  Rs. {cart.price}
                </span>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-clay">
                <p className="text-ink">{cart.color}</p>
                <p>Size: {cart.size}</p>
                <p>Customer: {cart.customerName || "-"}</p>
                <p>Phone: {cart.phoneNumber || "-"}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-stone/40 bg-white/70 p-8 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-clay">
                Sticker
              </p>
              <div className="mt-4 rounded-3xl border border-dashed border-stone/60 bg-sand/70 p-6">
                {cart.stickerUrl ? (
                  <img
                    src={cart.stickerUrl}
                    alt="Sticker"
                    className="mx-auto max-h-60 rounded-2xl object-contain"
                  />
                ) : (
                  <p className="text-sm text-clay">Sticker not available.</p>
                )}
              </div>
              {error && (
                <p className="mt-4 rounded-2xl border border-ember/40 bg-ember/10 px-4 py-2 text-sm text-ember">
                  {error}
                </p>
              )}
              <button
                type="button"
                className="mt-6 h-11 w-full rounded-full bg-ink text-xs font-semibold uppercase tracking-[0.2em] text-sand"
                onClick={handleCheckout}
              >
                Checkout on WhatsApp
              </button>
              <button
                type="button"
                className="mt-3 h-11 w-full rounded-full border border-clay text-xs font-semibold uppercase tracking-[0.2em]"
                onClick={() => navigate("/customize")}
              >
                Edit design
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Cart;
