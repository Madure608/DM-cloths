import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SizeGuideModal from "../components/SizeGuideModal.jsx";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const tshirt = location.state?.tshirt || null;
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const raw = localStorage.getItem("dm_wishlist");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setWishlistIds(parsed);
        }
      } catch (err) {
        setWishlistIds([]);
      }
    }
  }, []);

  const gallery = useMemo(() => {
    if (!tshirt?.imageUrl) return [];
    return [tshirt.imageUrl, tshirt.imageUrl, tshirt.imageUrl];
  }, [tshirt]);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    setSelectedImage(gallery[0] || "");
  }, [gallery]);

  const totalStock = useMemo(() => {
    const sizes = tshirt?.sizesAvailable || [];
    if (!sizes.length) return 3;
    const sum = sizes.reduce((acc, entry) => acc + (entry.stock || 0), 0);
    return sum || 3;
  }, [tshirt]);

  const priceValue = useMemo(() => {
    if (!tshirt?.price) return 2990;
    const parsed = Number.parseFloat(tshirt.price);
    return Number.isNaN(parsed) ? 2990 : parsed;
  }, [tshirt]);

  const subtotal = priceValue * quantity;
  const stockMax = Math.max(5, totalStock);
  const stockPercent = Math.min(
    100,
    Math.round((totalStock / stockMax) * 100)
  );

  const isWishlisted = wishlistIds.includes(tshirt?._id || id);

  const toggleWishlist = () => {
    const itemId = tshirt?._id || id;
    setWishlistIds((prev) => {
      const next = prev.includes(itemId)
        ? prev.filter((entry) => entry !== itemId)
        : [...prev, itemId];
      localStorage.setItem("dm_wishlist", JSON.stringify(next));
      return next;
    });
  };

  const relatedItems = useMemo(
    () => [
      {
        id: "rel-1",
        title: "Soft ash tee",
        price: "2,750",
      },
      {
        id: "rel-2",
        title: "Jet black tee",
        price: "2,990",
      },
      {
        id: "rel-3",
        title: "Monochrome tee",
        price: "2,500",
      },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-mist px-6 py-12 text-ink">
      <section className="mx-auto w-full max-w-6xl">
        <div className="text-xs uppercase tracking-[0.3em] text-slate">
          Home / New arrivals / {tshirt?.color || "Product"}
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-borderSoft bg-white p-6 shadow-sm">
            <div className="relative">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={tshirt?.color || "Product"}
                  className="h-[420px] w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="h-[420px] w-full rounded-2xl bg-brandOrangeSoft" />
              )}
              <button
                type="button"
                className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-borderSoft bg-white/90 text-lg"
                onClick={() => {
                  if (!gallery.length) return;
                  const index = gallery.indexOf(selectedImage);
                  const nextIndex =
                    index <= 0 ? gallery.length - 1 : index - 1;
                  setSelectedImage(gallery[nextIndex]);
                }}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-borderSoft bg-white/90 text-lg"
                onClick={() => {
                  if (!gallery.length) return;
                  const index = gallery.indexOf(selectedImage);
                  const nextIndex =
                    index === -1 || index === gallery.length - 1 ? 0 : index + 1;
                  setSelectedImage(gallery[nextIndex]);
                }}
                aria-label="Next image"
              >
                ›
              </button>
            </div>
            <div className="mt-4 grid gap-3">
              <div className="grid grid-cols-3 gap-3">
                {gallery.length > 0
                  ? gallery.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        className={`overflow-hidden rounded-2xl border ${
                          selectedImage === image
                            ? "border-brandOrange"
                            : "border-borderSoft"
                        }`}
                        onClick={() => setSelectedImage(image)}
                      >
                        <img
                          src={image}
                          alt="Product thumbnail"
                          className="h-24 w-full object-cover"
                        />
                      </button>
                    ))
                  : [0, 1, 2].map((index) => (
                      <div
                        key={`placeholder-${index}`}
                        className="h-24 rounded-2xl border border-borderSoft bg-brandOrangeSoft"
                      />
                    ))}
              </div>
              <div className="grid gap-2 text-sm text-slate">
                <span className="text-xs uppercase tracking-[0.3em] text-brandOrange">
                  New arrivals
                </span>
                <span>Product code: {id?.slice(0, 6) || "NEW"}</span>
              </div>
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
                  Rs. {priceValue.toLocaleString()}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className={`grid h-10 w-10 place-items-center rounded-full border border-borderSoft text-base ${
                      isWishlisted ? "text-brandOrange" : "text-ink"
                    }`}
                    onClick={toggleWishlist}
                    aria-label="Toggle wishlist"
                  >
                    ❤
                  </button>
                  <button
                    type="button"
                    className="grid h-10 w-10 place-items-center rounded-full border border-borderSoft text-base"
                    aria-label="Share"
                  >
                    ⤴
                  </button>
                </div>
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
                  onClick={() => setShowSizeGuide(true)}
                >
                  View size guide
                </button>
              </div>
              <div className="mt-6 grid gap-3">
                <p className="text-xs uppercase tracking-[0.3em] text-slate">
                  Quantity
                </p>
                <div className="flex w-fit items-center gap-2 rounded-full border border-borderSoft px-3 py-2">
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full border border-borderSoft text-lg"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full border border-borderSoft text-lg"
                    onClick={() =>
                      setQuantity((prev) =>
                        Math.min(totalStock, prev + 1)
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-slate">
                  Subtotal: Rs. {subtotal.toLocaleString()}
                </p>
                <div className="text-xs text-brandOrange">
                  Please hurry! Only {totalStock} left in stock
                </div>
                <div className="h-1 rounded-full bg-borderSoft">
                  <div
                    className="h-full rounded-full bg-brandOrange"
                    style={{ width: `${stockPercent}%` }}
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="h-11 flex-1 rounded-full bg-brandOrange px-6 text-xs font-semibold uppercase tracking-[0.25em] text-white"
                  onClick={() => navigate("/customize", { state: { tshirt } })}
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  className="h-11 flex-1 rounded-full border border-borderSoft px-6 text-xs font-semibold uppercase tracking-[0.25em]"
                >
                  Buy it now
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

        <div className="mt-10 rounded-3xl border border-borderSoft bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Related products</h2>
            <span className="text-xs uppercase tracking-[0.3em] text-slate">
              You may also like
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedItems.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-borderSoft bg-cream p-5"
              >
                <div className="h-40 rounded-2xl bg-brandOrangeSoft" />
                <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate">
                  {item.title}
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">
                  Rs. {item.price}
                </p>
                <button
                  type="button"
                  className="mt-4 w-full rounded-full border border-borderSoft px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em]"
                >
                  View details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SizeGuideModal
        open={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />
    </main>
  );
};

export default ProductDetails;
