const Customize = () => (
  <main className="min-h-screen bg-sand px-6 py-12 text-ink">
    <section className="mx-auto w-full max-w-6xl">
      <h1 className="font-display text-3xl sm:text-4xl">Customize</h1>
      <p className="mt-3 max-w-xl text-base text-clay">
        Select a T-shirt color and size, then upload your sticker.
      </p>
      <div className="mt-10 grid gap-6 rounded-3xl border border-stone/40 bg-white/70 p-8 shadow-sm">
        <div className="grid gap-4">
          <div className="h-10 w-full rounded-2xl bg-stone/40" />
          <div className="h-10 w-full rounded-2xl bg-stone/30" />
        </div>
        <div className="h-44 rounded-3xl border border-dashed border-stone/70 bg-sand/60" />
      </div>
    </section>
  </main>
);

export default Customize;
