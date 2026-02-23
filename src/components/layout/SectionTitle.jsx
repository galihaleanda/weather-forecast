/**
 * Consistent section heading used across all weather sections.
 */
export default function SectionTitle({ title, sub }) {
  return (
    <div className="mb-3 sm:mb-4">
      <h2 className="text-base sm:text-lg font-extrabold text-slate-700 tracking-tight leading-tight">
        {title}
      </h2>
      {sub && (
        <p className="text-xs text-slate-400 mt-0.5 font-medium">{sub}</p>
      )}
    </div>
  );
}
