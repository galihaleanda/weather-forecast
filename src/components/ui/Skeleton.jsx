/**
 * Animated loading skeleton placeholder.
 * @param {string} className - Tailwind classes for size / shape
 */
export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`
        animate-pulse rounded-2xl
        bg-gradient-to-r from-white/60 via-slate-100 to-white/60
        ${className}
      `}
    />
  );
}
