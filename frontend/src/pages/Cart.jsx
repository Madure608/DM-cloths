import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { confirmOrder, fetchMyOrders } from "../api/user";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const storedCart = useSelector((state) => state.cart.item);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");
  const stored = useMemo(() => {
    const raw = sessionStorage.getItem("dm_cart");
    return raw ? JSON.parse(raw) : null;
  }, []);

  const cart = location.state || storedCart || stored;

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      try {
        const data = await fetchMyOrders();
        if (isMounted) {
          setOrders(data || []);
        }
      } catch (err) {
        if (isMounted) {
          setOrdersError(err.message);
        }
      } finally {
        if (isMounted) {
          setOrdersLoading(false);
        }
      }
    };

    loadOrders();
    return () => {
      isMounted = false;
    };
  }, []);
  const handleCheckout = async () => {
    setError("");
    setSuccess("");

    if (!cart) {
      setError("Cart data is missing.");
      return;
    }

    if (!cart.orderIntentId) {
      setError("Order intent is missing. Please customize again.");
      return;
    }

    try {
      setSubmitting(true);
      await confirmOrder({ orderIntentId: cart.orderIntentId });
      setSuccess("Order confirmed. We will contact you soon.");
      sessionStorage.removeItem("dm_cart");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-mist px-6 py-12 text-ink">
      <section className="mx-auto w-full max-w-6xl">
        <h1 className="font-display text-4xl sm:text-5xl">Cart</h1>
        <p className="mt-3 max-w-xl text-base text-slate">
          Review your customized tee before WhatsApp checkout.
        </p>

        {!cart ? (
          <div className="mt-8 rounded-3xl border border-borderSoft bg-white p-8 shadow-sm">
            <p className="text-sm text-slate">Your cart is empty.</p>
            <button
              type="button"
              className="mt-6 h-11 rounded-full bg-brandOrange px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              onClick={() => navigate("/customize")}
            >
              Start customizing
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-borderSoft bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-slate">
                  Selection
                </p>
                <span className="text-sm font-semibold text-ink">
                  Rs. {cart.price}
                </span>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-slate">
                <p className="text-ink">{cart.color}</p>
                <p>Size: {cart.size}</p>
                <p>Customer: {cart.customerName || "-"}</p>
                <p>Phone: {cart.phoneNumber || "-"}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-borderSoft bg-white p-8 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-slate">
                Sticker
              </p>
              <div className="mt-4 rounded-3xl border border-dashed border-borderSoft bg-brandOrangeSoft/40 p-6">
                {cart.stickerUrl ? (
                  <img
                    src={cart.stickerUrl}
                    alt="Sticker"
                    className="mx-auto max-h-60 rounded-2xl object-contain"
                  />
                ) : (
                  <p className="text-sm text-slate">Sticker not available.</p>
                )}
              </div>
              {error && (
                <p className="mt-4 rounded-2xl border border-brandOrange/30 bg-brandOrangeSoft px-4 py-2 text-sm text-brandOrange">
                  {error}
                </p>
              )}
              {success && (
                <p className="mt-4 rounded-2xl border border-emerald/30 bg-emerald/10 px-4 py-2 text-sm text-emerald">
                  {success}
                </p>
              )}
              <button
                type="button"
                className="mt-6 h-11 w-full rounded-full bg-brandOrange text-xs font-semibold uppercase tracking-[0.2em] text-white"
                onClick={handleCheckout}
                disabled={submitting}
              >
                {submitting ? "Confirming..." : "Confirm order"}
              </button>
              <button
                type="button"
                className="mt-3 h-11 w-full rounded-full border border-borderSoft text-xs font-semibold uppercase tracking-[0.2em]"
                onClick={() => navigate("/customize")}
              >
                Edit design
              </button>
            </div>
          </div>
        )}

        <div className="mt-10 rounded-3xl border border-borderSoft bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl">Your orders</h2>
            <span className="text-xs uppercase tracking-[0.3em] text-slate">
              {orders.length} orders
            </span>
          </div>
          {ordersLoading && (
            <p className="mt-4 text-sm text-slate">Loading orders...</p>
          )}
          {ordersError && (
            <p className="mt-4 rounded-2xl border border-brandOrange/30 bg-brandOrangeSoft px-4 py-2 text-sm text-brandOrange">
              {ordersError}
            </p>
          )}
          {!ordersLoading && !ordersError && orders.length === 0 && (
            <p className="mt-4 text-sm text-slate">No orders yet.</p>
          )}
          {!ordersLoading && !ordersError && orders.length > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-3xl border border-borderSoft bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate">
                      {order.status}
                    </p>
                    <p className="text-xs text-slate">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-ink">
                    {order.selectedColor} / {order.selectedSize}
                  </p>
                  <p className="mt-1 text-sm text-slate">
                    {order.selectedTShirtId?.price
                      ? `Rs. ${order.selectedTShirtId.price}`
                      : "Price unavailable"}
                  </p>
                  {order.uploadedStickerUrl && (
                    <a
                      className="mt-3 inline-flex text-xs uppercase tracking-[0.2em] text-ink underline"
                      href={order.uploadedStickerUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View sticker
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Cart;
