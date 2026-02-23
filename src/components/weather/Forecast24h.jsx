import WeatherIcon from "../ui/WeatherIcon";
import Skeleton    from "../ui/Skeleton";
import { fmt24 }   from "../../utils/format";
import { uvLevel, r } from "../../utils/helpers";

/**
 * 24-hour detail grid.
 * Mobile: 2 columns | sm: 4 | md: 6 | lg: 8
 */
export default function Forecast24h({ data, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-28 sm:h-32" />
        ))}
      </div>
    );
  }

  if (!data?.forecast_24h?.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
      {data.forecast_24h.map((h, i) => {
        const uv = uvLevel(h.uv_index ?? 0);
        return (
          <div
            key={i}
            className="
              bg-white/55 backdrop-blur-sm
              rounded-xl sm:rounded-2xl
              p-2.5 sm:p-3
              flex flex-col items-center gap-1
              border border-white/70
              shadow-sm
              hover:shadow-md hover:-translate-y-0.5
              transition-all duration-200
              cursor-default
            "
          >
            <span className="text-xs font-bold text-slate-500 tracking-wide">{fmt24(h.time)}</span>
            <WeatherIcon code={h.weather_code} temp={h.temperature} size={28} animate={false} />
            <span className="text-sm sm:text-base font-extrabold text-slate-700 leading-none">
              {r(h.temperature)}°
            </span>
            <span className="text-xs text-sky-500 font-semibold leading-none">
              🌧 {r(h.rain_probability)}%
            </span>
            <span className="text-xs text-slate-400 leading-none">{r(h.wind_speed)} km/h</span>

            {h.uv_index != null && (
              <span className={`text-xs font-bold leading-none ${uv.color}`}>
                UV {(h.uv_index).toFixed(1)}
              </span>
            )}
            {h.cloud_cover != null && (
              <span className="text-xs text-slate-400 leading-none">☁ {r(h.cloud_cover)}%</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
