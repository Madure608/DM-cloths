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
    <div className="px-6 py-12 text-ink">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <p className="text-sm uppercase tracking-[0.3em] text-clay">
              DM CLOTHS STUDIO
            </p>
            <h1 className="font-display text-4xl sm:text-5xl">
              Custom tees with a modern, retail-ready experience.
            </h1>
            <p className="max-w-2xl text-base text-clay">
              Build a personalized tee in minutes: curated colors, on-trend
              fits, and a smooth WhatsApp checkout. We keep it minimal. You keep
              it yours.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/customize"
                className="rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-sand"
              >
                Start customizing
              </Link>
              <Link
                to="/signup"
                className="rounded-full border border-clay px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink"
              >
                Create account
              </Link>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-4 text-xs uppercase tracking-[0.3em] text-clay">
              <div className="rounded-2xl border border-stone/40 bg-white/70 px-4 py-3 text-center">
                48-hour prep
              </div>
              <div className="rounded-2xl border border-stone/40 bg-white/70 px-4 py-3 text-center">
                Soft-touch inks
              </div>
              <div className="rounded-2xl border border-stone/40 bg-white/70 px-4 py-3 text-center">
                Island delivery
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[32px] border border-stone/40 bg-white/70 p-8">
            <div className="absolute -right-16 -top-10 h-40 w-40 rounded-full bg-ember/30 blur-3xl" />
            <div className="absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-rose/40 blur-3xl" />
            <div className="relative grid gap-4">
              <p className="text-xs uppercase tracking-[0.3em] text-clay">
                How it works
              </p>
              <div className="grid gap-4 text-sm text-ink">
                <div className="rounded-2xl border border-stone/30 bg-white px-4 py-3">
                  Select a color and size from our live inventory.
                </div>
                <div className="rounded-2xl border border-stone/30 bg-white px-4 py-3">
                  Upload a sticker or logo, we do the placement.
                </div>
                <div className="rounded-2xl border border-stone/30 bg-white px-4 py-3">
                  Confirm via WhatsApp and track delivery updates.
                </div>
              </div>
              <div className="rounded-2xl border border-stone/40 bg-sand/70 px-4 py-3 text-xs uppercase tracking-[0.25em] text-clay">
                Trusted by 1,200+ creators
              </div>
            </div>
          </div>
        </div>

        <div id="collection" className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Current collection</h2>
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
                    className="h-44 animate-fadeUp rounded-3xl border border-stone/40 bg-white/70"
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

        <div className="grid gap-6 rounded-[36px] border border-stone/40 bg-white/80 p-8 lg:grid-cols-3">
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
              title: "Live inventory",
              body: "Stock levels stay current so you never order out-of-stock sizes.",
            },
          ].map((item) => (
            <div key={item.title} className="grid gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
                {item.title}
              </h3>
              <p className="text-sm text-clay">{item.body}</p>
            </div>
          ))}
        </div>

        <div id="faq" className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">FAQ</h2>
            <Link
              to="/customize"
              className="text-xs uppercase tracking-[0.3em] text-clay"
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
                className="rounded-3xl border border-stone/40 bg-white/80 p-6"
              >
                <p className="text-sm font-semibold text-ink">{item.q}</p>
                <p className="mt-2 text-sm text-clay">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[36px] border border-stone/40 bg-ink px-8 py-10 text-sand">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-sand/70">
                Ready when you are
              </p>
              <h2 className="font-display text-3xl">
                Build your next drop in minutes.
              </h2>
              <p className="text-sm text-sand/70">
                Create a design, share it with your audience, and let us handle
                production and delivery.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/customize"
                className="rounded-full bg-sand px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink"
              >
                Start customizing
              </Link>
              <Link
                to="/signup"
                className="rounded-full border border-sand/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em]"
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
