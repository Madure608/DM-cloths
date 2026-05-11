const AdminDashboard = () => (
  <main className="min-h-screen bg-sand px-6 py-12 text-ink">
    <section className="mx-auto w-full max-w-6xl">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.3em] text-clay">Admin</p>
        <h1 className="font-display text-3xl sm:text-4xl">Dashboard</h1>
      </div>
      <div className="mt-10 grid gap-6">
        <div className="rounded-3xl border border-stone/40 bg-white/70 p-6 shadow-sm">
          <div className="h-8 w-56 rounded-2xl bg-stone/40" />
          <div className="mt-4 h-24 rounded-2xl bg-stone/20" />
        </div>
        <div className="rounded-3xl border border-stone/40 bg-white/70 p-6 shadow-sm">
          <div className="h-8 w-56 rounded-2xl bg-stone/40" />
          <div className="mt-4 h-24 rounded-2xl bg-stone/20" />
        </div>
      </div>
    </section>
  </main>
);

export default AdminDashboard;
