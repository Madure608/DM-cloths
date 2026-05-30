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
    <div className="px-6 py-10 text-ink">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-brandOrangeSoft px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-brandOrange">
              Marketplace drops
            </div>
            <h1 className="font-display text-5xl leading-none sm:text-6xl">
              Build your next tee. Shop it like a marketplace.
            </h1>
            <p className="max-w-2xl text-base text-slate">
              New colors every week, instant WhatsApp checkout, and fast island
              delivery. Pick a fit, add your sticker, and launch a drop in
              minutes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/customize"
                className="rounded-full bg-brandBlue px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white"
              >
                Start customizing
              </Link>
              <Link
                to="/signup"
                className="rounded-full border border-borderSoft bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink"
              >
                Create account
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3 text-[11px] uppercase tracking-[0.3em] text-slate">
              <div className="rounded-2xl border border-borderSoft bg-white px-4 py-3 text-center">
                48-hour prep
              </div>
              <div className="rounded-2xl border border-borderSoft bg-white px-4 py-3 text-center">
                Live inventory
              </div>
              <div className="rounded-2xl border border-borderSoft bg-white px-4 py-3 text-center">
                Island delivery
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="overflow-hidden rounded-3xl border border-borderSoft bg-white shadow-sm">
              <img
                src={homePostImage}
                alt="DM CLOTHS featured post"
                className="h-64 w-full object-cover sm:h-80"
                loading="lazy"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Best sellers", "New prints"].map((label) => (
                <div
                  key={label}
                  className="rounded-3xl border border-borderSoft bg-white px-4 py-5 text-sm text-slate"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-brandOrange">
                    {label}
                  </p>
                  <p className="mt-2 text-sm">
                    Curated weekly and ready for fast checkout.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className="rounded-full border border-borderSoft bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate"
            >
              {category}
            </button>
          ))}
        </div>

        <div id="flash" className="grid gap-4 rounded-3xl bg-ink px-6 py-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                Flash sale
              </p>
              <h2 className="font-display text-3xl">Limited-time drops</h2>
            </div>
            <div className="rounded-full bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.3em]">
              Ends in 04:21:09
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Bold orange",
              "Soft ash",
              "Jet black",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Flash pick
                </p>
                <p className="mt-2 text-sm font-semibold">{item}</p>
                <p className="mt-3 text-xs text-white/70">
                  Save up to 20% on limited stock.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="collection" className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl">New arrivals</h2>
              <span className="text-xs uppercase tracking-[0.3em] text-slate">
                Updated weekly
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/customize"
                className="h-10 rounded-full bg-brandOrange px-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white"
              >
                Start customizing
              </Link>
              <label className="text-[11px] uppercase tracking-[0.3em] text-slate">
                Color
                <select
                  className="mt-2 h-10 rounded-2xl border border-borderSoft bg-white px-3 text-xs"
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
                Sort
                <select
                  className="mt-2 h-10 rounded-2xl border border-borderSoft bg-white px-3 text-xs"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  <option value="latest">Latest</option>
                  <option value="price_low">Price: Low to high</option>
                  <option value="price_high">Price: High to low</option>
                </select>
              </label>
            </div>
          </div>

          {error && (
            <p className="rounded-2xl border border-brandOrange/30 bg-brandOrangeSoft px-4 py-2 text-sm text-brandOrange">
              {error}
            </p>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="h-44 animate-fadeUp rounded-3xl border border-borderSoft bg-white"
                  />
                ))
              : sorted.map((tshirt, index) => (
                  <motion.button
                    key={tshirt._id}
                    type="button"
                    className="group flex h-full flex-col justify-between rounded-3xl border border-borderSoft bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-brandOrange/40"
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    onClick={() => handleSelect(tshirt)}
                  >
                    {tshirt.imageUrl ? (
                      <img
                        src={tshirt.imageUrl}
                        alt={tshirt.color}
                        className="h-40 w-full rounded-2xl border border-borderSoft object-cover"
                      />
                    ) : (
                      <div className="h-40 w-full rounded-2xl border border-borderSoft bg-brandOrangeSoft" />
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate">
                        {tshirt.color}
                      </p>
                      <span className="text-sm font-semibold text-ink">
                        Rs. {tshirt.price}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-slate">
                      Sizes: {tshirt.sizesAvailable.map((s) => s.size).join(", ")}
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.2em] text-ink">
                        Customize
                      </span>
                      <span className="h-8 w-8 rounded-full border border-borderSoft bg-brandOrangeSoft" />
                    </div>
                  </motion.button>
                ))}
          </div>
        </div>

        <div className="grid gap-6 rounded-3xl border border-borderSoft bg-white p-8 lg:grid-cols-3">
          {[
            {
              title: "Premium fabric",
              body: "180 GSM cotton blends that hold color and shape after every wash.",
            },
            {
              title: "Smart sizing",
              body: "Balanced cuts that work for streetwear or clean minimal fits.",
            },
            {
              title: "Fast confirmation",
              body: "Quick WhatsApp confirmations and tracked updates.",
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
            <h2 className="font-display text-3xl">FAQ</h2>
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
                q: "How long does it take?",
                a: "Most orders are ready within 48 hours. Delivery takes 1-3 days island-wide.",
              },
              {
                q: "Can I use my own artwork?",
                a: "Yes. Upload any PNG/JPG. We will confirm placement via WhatsApp.",
              },
              {
                q: "Do you store my file?",
                a: "We keep files only until the order is complete, then remove them.",
              },
              {
                q: "What sizes are available?",
                a: "Sizes depend on live stock. The customize screen shows current availability.",
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

        <div className="rounded-3xl bg-brandBlue px-8 py-10 text-white">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                Ready when you are
              </p>
              <h2 className="font-display text-4xl">
                Launch your next drop today.
              </h2>
              <p className="text-sm text-white/80">
                Create a design, share it with your audience, and let us handle
                production and delivery.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/customize"
                className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink"
              >
                Start customizing
              </Link>
              <Link
                to="/signup"
                className="rounded-full border border-white/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em]"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
