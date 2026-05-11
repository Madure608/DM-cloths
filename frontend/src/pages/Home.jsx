import { Link } from "react-router-dom";

const Home = () => (
  <main className="min-h-screen bg-sand px-6 py-12 text-ink">
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <p className="text-sm uppercase tracking-[0.3em] text-clay">
        DM CLOTHS
      </p>
      <h1 className="font-display text-4xl sm:text-5xl">
        Premium custom tees, designed quietly.
      </h1>
      <p className="max-w-2xl text-base text-clay">
        Choose a base color, upload your sticker, and place an order in minutes.
        We keep it minimal. You keep it personal.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          to="/customize"
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-sand"
        >
          Start customizing
        </Link>
        <Link
          to="/admin/login"
          className="rounded-full border border-clay px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink"
        >
          Admin
        </Link>
      </div>
    </section>
  </main>
);

export default Home;
