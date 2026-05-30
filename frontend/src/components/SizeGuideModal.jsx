const SizeGuideModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close size guide"
      />
      <div className="relative w-full max-w-lg rounded-3xl border border-borderSoft bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl">Size guide</h3>
          <button
            type="button"
            className="rounded-full border border-borderSoft px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <p className="mt-2 text-sm text-slate">
          Use the chart below to find your best fit.
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-borderSoft">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream text-[11px] uppercase tracking-[0.25em] text-slate">
              <tr>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Chest (in)</th>
                <th className="px-4 py-3">Length (in)</th>
              </tr>
            </thead>
            <tbody className="text-slate">
              {[
                { size: "S", chest: "36-38", length: "26" },
                { size: "M", chest: "38-40", length: "27" },
                { size: "L", chest: "40-42", length: "28" },
                { size: "XL", chest: "42-44", length: "29" },
              ].map((row) => (
                <tr key={row.size} className="border-t border-borderSoft">
                  <td className="px-4 py-3 font-semibold text-ink">
                    {row.size}
                  </td>
                  <td className="px-4 py-3">{row.chest}</td>
                  <td className="px-4 py-3">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
