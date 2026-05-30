import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchTShirts } from "../api/user";
import homePostImage from "../assets/WhatsApp Image 2026-05-19 at 9.11.11 PM.jpeg";

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.06, duration: 0.4 },
  }),
};

const Home = () => {
  const navigate = useNavigate();
  const [tshirts, setTshirts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [colorFilter, setColorFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const categories = [
    "Streetwear",
    "Minimal",
    "Oversized",
    "Logo",
    "Pastel",
    "Monochrome",
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTShirts();
        setTshirts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const colors = [
    "all",
    ...Array.from(new Set(tshirts.map((tshirt) => tshirt.color.toLowerCase()))),
  ];

  const filtered = tshirts.filter((tshirt) => {
    if (colorFilter === "all") return true;
    return tshirt.color.toLowerCase() === colorFilter;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price_low") return a.price - b.price;
    if (sortBy === "price_high") return b.price - a.price;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handleSelect = (tshirt) => {
    const token = localStorage.getItem("dm_user_token");
    if (!token) {
      navigate("/login", { state: { redirectTo: "/customize", tshirt } });
      return;
    }
    navigate("/customize", { state: { tshirt } });
  };

  return (
    <div className="text-ink">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-10">
        <div className="rounded-3xl border border-borderSoft bg-white">
          <div className="grid gap-6 overflow-hidden rounded-3xl lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[360px]">
              <img
                src={homePostImage}
                alt="DM CLOTHS campaign"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
                <p className="text-xs uppercase tracking-[0.45em]">Site wide</p>
                <h1 className="mt-3 font-display text-5xl sm:text-6xl">Offer</h1>
                <p className="mt-4 text-4xl font-semibold">Flat 20% off</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/customize"
                    className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-brandOrange"
                  >
                    Start customizing
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-full border border-white/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em]"
                  >
                    Create account
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-6 p-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-brandOrange">
                  Trending now
                </p>
                <h2 className="mt-3 font-display text-4xl">
                  New arrivals for every drop.
                </h2>
                <p className="mt-4 text-sm text-slate">
                  Shop fresh prints, seasonal palettes, and limited editions.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Buy 1 get 1 tees",
                  "Members-only vouchers",
                  "Weekend sale",
                  "Express delivery",
                ].map((label) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-borderSoft bg-cream px-4 py-4 text-xs uppercase tracking-[0.28em] text-slate"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 rounded-3xl border border-borderSoft bg-white px-6 py-5 sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-slate">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className="rounded-full border border-borderSoft px-4 py-2 hover:border-brandOrange"
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-slate">
            <span className="rounded-full bg-brandOrangeSoft px-4 py-2 text-brandOrange">
              Site wide
            </span>
            <span>Use code: BUG20</span>
          </div>
        </div>

        <div id="collection" className="grid gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="h-px w-16 bg-borderSoft" />
              <div>
                <h2 className="font-display text-3xl">New arrivals</h2>
                <span className="text-xs uppercase tracking-[0.3em] text-slate">
                  Updated weekly
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/customize"
                className="rounded-full bg-brandOrange px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white"
              >
                Start customizing
              </Link>
              <span className="text-[11px] uppercase tracking-[0.3em] text-slate">
                View all
              </span>
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl border border-borderSoft bg-white p-6 lg:grid-cols-[1fr_3fr]">
            <div className="grid gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate">
                  Filters
                </p>
                <div className="mt-4 grid gap-3">
                  <label className="text-[11px] uppercase tracking-[0.3em] text-slate">
                    Color
                    <select
                      className="mt-2 h-10 w-full rounded-xl border border-borderSoft bg-white px-3 text-xs"
                      value={colorFilter}
                      onChange={(event) => setColorFilter(event.target.value)}
                    >
                      {colors.map((color) => (
                        <option key={color} value={color}>
                          {color === "all" ? "All" : color}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-[11px] uppercase tracking-[0.3em] text-slate">
                    Size
                    <select className="mt-2 h-10 w-full rounded-xl border border-borderSoft bg-white px-3 text-xs">
                      <option>All</option>
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                  </label>
                  <label className="text-[11px] uppercase tracking-[0.3em] text-slate">
                    Sort
                    <select
                      className="mt-2 h-10 w-full rounded-xl border border-borderSoft bg-white px-3 text-xs"
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                    >
                      <option value="latest">Latest</option>
                      <option value="price_low">Price: Low to high</option>
                      <option value="price_high">Price: High to low</option>
                    </select>
                  </label>
                  <div className="rounded-2xl border border-borderSoft bg-cream px-4 py-4 text-xs uppercase tracking-[0.28em] text-slate">
                    Size guide
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-borderSoft bg-brandOrangeSoft px-4 py-4 text-xs uppercase tracking-[0.28em] text-brandOrange">
                Buy 1 get 1
              </div>
            </div>

            <div>
              {error && (
                <p className="mb-4 rounded-2xl border border-brandOrange/30 bg-brandOrangeSoft px-4 py-2 text-sm text-brandOrange">
                  {error}
                </p>
              )}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {loading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={`skeleton-${index}`}
                        className="h-64 animate-fadeUp rounded-3xl border border-borderSoft bg-white"
                      />
                    ))
                  : sorted.map((tshirt, index) => (
                      <motion.button
                        key={tshirt._id}
                        type="button"
                        className="group flex h-full flex-col rounded-3xl border border-borderSoft bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:border-brandOrange/40"
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        onClick={() => handleSelect(tshirt)}
                      >
                        <div className="relative">
                          <span className="absolute left-3 top-3 rounded bg-white px-2 py-1 text-[10px] uppercase tracking-[0.25em] text-slate">
                            New
                          </span>
                          <button
                            type="button"
                            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate"
                            onClick={(event) => event.stopPropagation()}
                          >
                            ❤
                          </button>
                          {tshirt.imageUrl ? (
                            <img
                              src={tshirt.imageUrl}
                              alt={tshirt.color}
                              className="h-56 w-full rounded-2xl object-cover"
                            />
                          ) : (
                            <div className="h-56 w-full rounded-2xl bg-brandOrangeSoft" />
                          )}
                        </div>
                        <div className="mt-4">
                          <p className="text-xs uppercase tracking-[0.3em] text-slate">
                            {tshirt.color}
                          </p>
                          <p className="mt-2 text-sm text-slate">
                            Sizes: {tshirt.sizesAvailable.map((s) => s.size).join(", ")}
                          </p>
                          <p className="mt-3 text-base font-semibold text-ink">
                            Rs. {tshirt.price}
                          </p>
                          <Link
                            to={`/product/${tshirt._id}`}
                            state={{ tshirt }}
                            className="mt-3 inline-flex text-[11px] uppercase tracking-[0.3em] text-brandOrange"
                            onClick={(event) => event.stopPropagation()}
                          >
                            View details
                          </Link>
                          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate">
                            or 3 x Rs. {Math.round(tshirt.price / 3)}
                          </p>
                        </div>
                      </motion.button>
                    ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 rounded-3xl border border-borderSoft bg-white p-8 lg:grid-cols-3">
          {[
            {
              title: "Premium fabric",
              body: "Soft cotton blends that hold shape after every wash.",
            },
            {
              title: "Easy returns",
              body: "Shop with confidence and exchange within 7 days.",
            },
            {
              title: "Pay later",
              body: "Split your payment in 3 easy installments.",
            },
          ].map((item) => (
            <div key={item.title} className="grid gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
                {item.title}
              </h3>
              <p className="text-sm text-slate">{item.body}</p>
            </div>
          ))}
        </div>

        <div id="faq" className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl">Size guide</h2>
            <Link
              to="/customize"
              className="text-xs uppercase tracking-[0.3em] text-slate"
            >
              Start order
            </Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {[
              {
                q: "How do I pick the right size?",
                a: "Use the size chart in Customize to compare chest and length.",
              },
              {
                q: "What sizes are in stock?",
                a: "Sizes are updated in real time for each color.",
              },
              {
                q: "Do you offer exchanges?",
                a: "Yes, exchanges are accepted within 7 days.",
              },
              {
                q: "Need help?",
                a: "Chat with us on WhatsApp and we will guide your fit.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-3xl border border-borderSoft bg-white p-6"
              >
                <p className="text-sm font-semibold text-ink">{item.q}</p>
                <p className="mt-2 text-sm text-slate">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
