import WeatherIcon from "../ui/WeatherIcon";
import Skeleton    from "../ui/Skeleton";
import { fmt24 }   from "../../utils/format";
import { r }       from "../../utils/helpers";

/**
 * Horizontal-scrollable strip showing the next 6 hours.
 * Cards are fixed-width so they scroll naturally on mobile.
 */
export default function Forecast6h({ data, loading }) {
  if (loading) {
    return (
      <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="min-w-[110px] sm:min-w-[130px] h-36 sm:h-40 shrink-0" />
        ))}
      </div>
    );
  }

  if (!data?.forecast_6h?.length) return null;

  return (
    <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 -mx-1 px-1 scroll-smooth snap-x snap-mandatory scrollbar-hide">
      {data.forecast_6h.map((h, i) => (
        <div
          key={i}
          className="
            shrink-0 snap-start
            min-w-[110px] sm:min-w-[130px]
            bg-white/55 backdrop-blur-sm
            rounded-2xl
            p-3 sm:p-4
            flex flex-col items-center gap-1.5 sm:gap-2
            border border-white/70
            shadow-sm
            hover:shadow-md hover:-translate-y-0.5
            transition-all duration-200
            cursor-default
          "
        >
          <span className="text-xs font-bold text-slate-500 tracking-wide">
            {fmt24(h.time)}
          </span>
          <WeatherIcon code={h.weather_code} temp={h.temperature} size={38} animate={false} />
          <span className="text-base sm:text-lg font-extrabold text-slate-700 leading-none">
            {r(h.temperature)}°
          </span>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-xs text-sky-500 font-semibold">🌧 {r(h.rain_probability)}%</span>
            <span className="text-xs text-slate-400 font-medium">{r(h.wind_speed)} km/h</span>
          </div>
        </div>
      ))}
    </div>
  );
}
