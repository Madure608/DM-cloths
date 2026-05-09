import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="min-h-screen bg-dm-ivory text-dm-ink">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-3xl font-semibold">Page not found</h2>
        <p className="mt-3 text-dm-ink/80">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-full border border-dm-ink px-6 py-2 text-sm font-semibold uppercase tracking-wide"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
