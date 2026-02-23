import Skeleton   from "../ui/Skeleton";
import { fmt24 }  from "../../utils/format";
import { clamp }  from "../../utils/helpers";

/**
 * Sunrise / Sunset card with animated arc progress bar.
 * Shows current sun position through the day.
 */
export default function SunriseSunset({ data, loading }) {
  if (loading) return <Skeleton className="h-36 sm:h-40 w-full" />;
  if (!data?.sun) return null;

  const { sunrise, sunset } = data.sun;
  const now     = new Date();
  const sr      = new Date(sunrise);
  const ss      = new Date(sunset);
  const totalMs = ss - sr;
  const pct     = clamp(((now - sr) / totalMs) * 100, 0, 100);
  const isDaytime = now >= sr && now <= ss;

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
        Sunrise &amp; Sunset
      </p>

      {/* Times */}
      <div className="flex items-center justify-between mb-5">
        {/* Sunrise */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-amber-100 flex items-center justify-center text-lg sm:text-xl shrink-0">
            🌅
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium leading-none mb-0.5">Sunrise</p>
            <p className="font-extrabold text-slate-700 text-base sm:text-lg leading-none">{fmt24(sunrise)}</p>
          </div>
        </div>

        {/* Daylight label */}
        <div className="text-center hidden sm:block">
          <p className="text-xs text-slate-400">Daylight</p>
          <p className="text-xs font-bold text-slate-500">
            {Math.round(totalMs / 3600000)}h {Math.round((totalMs % 3600000) / 60000)}m
          </p>
        </div>

        {/* Sunset */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div>
            <p className="text-xs text-slate-400 font-medium text-right leading-none mb-0.5">Sunset</p>
            <p className="font-extrabold text-slate-700 text-base sm:text-lg leading-none">{fmt24(sunset)}</p>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-orange-100 flex items-center justify-center text-lg sm:text-xl shrink-0">
            🌇
          </div>
        </div>
      </div>

      {/* Arc progress track */}
      <div className="relative">
        {/* Track */}
        <div className="h-2.5 sm:h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${pct}%`,
              background: isDaytime
                ? "linear-gradient(90deg, #FCD34D, #FB923C)"
                : "linear-gradient(90deg, #94A3B8, #CBD5E1)",
            }}
          />
        </div>

        {/* Sun / moon marker */}
        <div
          className="
            absolute top-1/2 -translate-y-1/2 -translate-x-1/2
            w-5 h-5 sm:w-6 sm:h-6
            rounded-full shadow-md
            border-2 border-white
            flex items-center justify-center
            text-xs
            transition-all duration-1000
          "
          style={{
            left: `${clamp(pct, 2, 98)}%`,
            background: isDaytime ? "#FBBF24" : "#94A3B8",
          }}
        >
          {isDaytime ? "☀" : "🌙"}
        </div>
      </div>

      <div className="flex justify-between text-xs text-slate-400 font-medium mt-1.5">
        <span>Dawn</span>
        <span>Dusk</span>
      </div>
    </div>
  );
}
