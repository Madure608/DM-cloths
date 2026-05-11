import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchTShirts } from "../api/user";

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

  return (
    <main className="min-h-screen bg-sand px-6 py-12 text-ink">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <p className="text-sm uppercase tracking-[0.3em] text-clay">
              DM CLOTHS
            </p>
            <h1 className="font-display text-4xl sm:text-5xl">
              Premium custom tees, designed quietly.
            </h1>
            <p className="max-w-2xl text-base text-clay">
              Choose a base color, upload your sticker, and place an order in
              minutes. We keep it minimal. You keep it personal.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/customize"
                className="rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-sand"
              >
                Start customizing
              </Link>
              <Link
                to="/login"
                className="rounded-full border border-clay px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded-full border border-clay px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink"
              >
                Sign up
              </Link>
              <Link
                to="/admin/login"
                className="rounded-full border border-clay px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink"
              >
                Admin
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[32px] border border-stone/40 bg-white/70 p-8">
            <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-ember/20 blur-3xl" />
            <div className="absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-stone/30 blur-3xl" />
            <div className="relative grid gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-clay">
                Process
              </p>
              <div className="grid gap-4 text-sm text-ink">
                <div className="rounded-2xl border border-stone/30 bg-white px-4 py-3">
                  Pick a color and size from curated stock.
                </div>
                <div className="rounded-2xl border border-stone/30 bg-white px-4 py-3">
                  Upload your sticker, we handle the print.
                </div>
                <div className="rounded-2xl border border-stone/30 bg-white px-4 py-3">
                  Checkout via WhatsApp for a fast confirmation.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Collection</h2>
            <span className="text-xs uppercase tracking-[0.3em] text-clay">
              Updated weekly
            </span>
          </div>

          {error && (
            <p className="rounded-2xl border border-ember/40 bg-ember/10 px-4 py-2 text-sm text-ember">
              {error}
            </p>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="h-40 rounded-3xl border border-stone/40 bg-white/70"
                  />
                ))
              : tshirts.map((tshirt, index) => (
                  <motion.button
                    key={tshirt._id}
                    type="button"
                    className="group flex h-full flex-col justify-between rounded-3xl border border-stone/40 bg-white/80 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-ink/30"
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    onClick={() =>
                      navigate("/customize", { state: { tshirt } })
                    }
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.3em] text-clay">
                        {tshirt.color}
                      </p>
                      <span className="text-sm font-semibold text-ink">
                        Rs. {tshirt.price}
                      </span>
                    </div>
                    <div className="mt-4 text-sm text-clay">
                      Sizes: {tshirt.sizesAvailable.map((s) => s.size).join(", ")}
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.2em] text-ink">
                        Customize
                      </span>
                      <span className="h-8 w-8 rounded-full border border-stone/40 bg-sand" />
                    </div>
                  </motion.button>
                ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
