import { useLocation, useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const tshirt = location.state?.tshirt || null;

  return (
    <main className="min-h-screen bg-mist px-6 py-12 text-ink">
      <section className="mx-auto w-full max-w-6xl">
        <div className="text-xs uppercase tracking-[0.3em] text-slate">
          Home / New arrivals / {tshirt?.color || "Product"}
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-borderSoft bg-white p-6 shadow-sm">
            {tshirt?.imageUrl ? (
              <img
                src={tshirt.imageUrl}
                alt={tshirt.color}
                className="h-[420px] w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="h-[420px] w-full rounded-2xl bg-brandOrangeSoft" />
            )}
            <div className="mt-4 grid gap-2 text-sm text-slate">
              <span className="text-xs uppercase tracking-[0.3em] text-brandOrange">
                New arrivals
              </span>
              <span>Product code: {id?.slice(0, 6) || "NEW"}</span>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-3xl border border-borderSoft bg-white p-6 shadow-sm">
              <h1 className="font-display text-4xl">
                {tshirt?.color || "Limited edition tee"}
              </h1>
              <p className="mt-3 text-sm text-slate">
                Soft cotton blend with a clean finish, ready for daily wear.
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-2xl font-semibold text-ink">
                  Rs. {tshirt?.price || "2,990"}
                </span>
                <button
                  type="button"
                  className="rounded-full border border-borderSoft px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em]"
                >
                  ❤ Add to wish list
                </button>
              </div>
              <div className="mt-6 grid gap-3">
                <p className="text-xs uppercase tracking-[0.3em] text-slate">
                  Sizes
                </p>
                <div className="flex flex-wrap gap-2">
                  {(tshirt?.sizesAvailable || ["S", "M", "L", "XL"]).map(
                    (entry) => (
                      <span
                        key={entry.size || entry}
                        className="rounded-full border border-borderSoft px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                      >
                        {entry.size || entry}
                      </span>
                    )
                  )}
                </div>
                <button
                  type="button"
                  className="mt-2 w-fit text-xs uppercase tracking-[0.3em] text-brandOrange"
                >
                  View size guide
                </button>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="h-11 rounded-full bg-brandOrange px-6 text-xs font-semibold uppercase tracking-[0.25em] text-white"
                  onClick={() => navigate("/customize", { state: { tshirt } })}
                >
                  Customize this item
                </button>
                <button
                  type="button"
                  className="h-11 rounded-full border border-borderSoft px-6 text-xs font-semibold uppercase tracking-[0.25em]"
                >
                  Add to cart
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-borderSoft bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-slate">
                Promotions
              </p>
              <div className="mt-4 grid gap-3 text-sm text-slate">
                <p>Buy 1 get 1 on selected colors.</p>
                <p>Free delivery on orders over Rs. 7,500.</p>
                <p>Earn double points on new arrivals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
