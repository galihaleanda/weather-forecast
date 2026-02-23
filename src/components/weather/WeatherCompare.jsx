import Skeleton from "../ui/Skeleton";

/**
 * Compares today's average temperature against yesterday's.
 * Mobile: stacked | sm+: side-by-side
 */
export default function WeatherCompare({ data, loading }) {
  if (loading) return <Skeleton className="h-36 sm:h-40 w-full" />;
  if (!data?.compare) return null;

  const { today_avg, yesterday_avg } = data.compare;
  const diff  = +(today_avg - yesterday_avg).toFixed(1);
  const isUp  = diff >= 0;
  const equal = diff === 0;

  return (
    <div className="
      bg-white/55 backdrop-blur-sm
      rounded-2xl sm:rounded-3xl
      p-4 sm:p-5 md:p-6
      border border-white/70
      shadow-sm
      h-full
    ">
      {/* Title */}
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
        Yesterday vs Today
      </p>

      {/* Comparison row */}
      <div className="flex items-center justify-between gap-3">

        {/* Yesterday */}
        <div className="flex-1 text-center">
          <p className="text-xs text-slate-400 font-medium mb-1">Yesterday</p>
          <p className="text-3xl sm:text-4xl font-black text-slate-400 leading-none tabular-nums">
            {yesterday_avg != null ? Math.round(yesterday_avg) : "—"}
            <span className="text-xl sm:text-2xl font-bold">°</span>
          </p>
        </div>

        {/* Center indicator */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          {/* Arrow circle */}
          <div className={`
            w-12 h-12 sm:w-14 sm:h-14
            rounded-full flex items-center justify-center
            text-xl sm:text-2xl font-black
            shadow-sm
            ${equal ? "bg-slate-100 text-slate-500"
              : isUp  ? "bg-orange-100 text-orange-500"
                      : "bg-sky-100   text-sky-500"}
          `}>
            {equal ? "=" : isUp ? "↑" : "↓"}
          </div>

          {/* Diff value */}
          <p className={`
            text-sm sm:text-base font-extrabold leading-none
            ${equal ? "text-slate-500" : isUp ? "text-orange-500" : "text-sky-500"}
          `}>
            {isUp && !equal ? "+" : ""}{diff}°
          </p>

          {/* Label */}
          <p className="text-xs text-slate-400 leading-none">
            {equal ? "Same" : isUp ? "Warmer" : "Cooler"}
          </p>
        </div>

        {/* Today */}
        <div className="flex-1 text-center">
          <p className="text-xs text-slate-400 font-medium mb-1">Today</p>
          <p className="text-3xl sm:text-4xl font-black text-slate-700 leading-none tabular-nums">
            {today_avg != null ? Math.round(today_avg) : "—"}
            <span className="text-xl sm:text-2xl font-bold">°</span>
          </p>
        </div>
      </div>

      {/* Visual temperature bar */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="flex gap-2 items-center">
          <span className="text-xs text-slate-400 w-16 text-right shrink-0">
            {yesterday_avg != null ? Math.round(yesterday_avg) : "—"}°
          </span>
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden relative">
            {/* Yesterday bar */}
            <div
              className="absolute inset-y-0 left-0 bg-slate-300 rounded-full"
              style={{ width: `${Math.min(100, ((yesterday_avg ?? 0) / 45) * 100)}%` }}
            />
            {/* Today bar overlay */}
            <div
              className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ${isUp ? "bg-orange-400" : "bg-sky-400"}`}
              style={{ width: `${Math.min(100, ((today_avg ?? 0) / 45) * 100)}%`, opacity: 0.7 }}
            />
          </div>
          <span className={`text-xs font-bold w-16 shrink-0 ${isUp ? "text-orange-500" : "text-sky-500"}`}>
            {today_avg != null ? Math.round(today_avg) : "—"}°
          </span>
        </div>
        <div className="flex justify-center gap-3 mt-2">
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <span className="inline-block w-3 h-1.5 bg-slate-300 rounded-full" /> Yesterday
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <span className={`inline-block w-3 h-1.5 rounded-full ${isUp ? "bg-orange-400" : "bg-sky-400"}`} /> Today
          </span>
        </div>
      </div>
    </div>
  );
}
