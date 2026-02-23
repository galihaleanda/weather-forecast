import WeatherIcon  from "../ui/WeatherIcon";
import Skeleton     from "../ui/Skeleton";
import { fmtDay, fmtDate } from "../../utils/format";
import { r } from "../../utils/helpers";

/**
 * 7-day extended forecast as a vertical list.
 * Each row is touch-friendly with generous tap targets.
 */
export default function Forecast7Days({ data, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-14 sm:h-16" />
        ))}
      </div>
    );
  }

  if (!data?.forecast_7days?.length) return null;

  return (
    <div className="flex flex-col gap-2">
      {data.forecast_7days.map((d, i) => (
        <div
          key={i}
          className="
            bg-white/55 backdrop-blur-sm
            rounded-xl sm:rounded-2xl
            px-3.5 sm:px-5 py-3 sm:py-3.5
            flex items-center gap-2 sm:gap-3
            border border-white/70
            shadow-sm
            hover:shadow-md hover:bg-white/70
            active:scale-[0.99]
            transition-all duration-200
            cursor-default
          "
        >
          {/* Day */}
          <div className="w-14 sm:w-16 shrink-0">
            <p className="font-bold text-slate-700 text-sm sm:text-base leading-none">{fmtDay(d.date)}</p>
            <p className="text-xs text-slate-400 mt-0.5">{fmtDate(d.date)}</p>
          </div>

          {/* Icon */}
          <div className="shrink-0">
            <WeatherIcon code={d.weather_code} temp={d.temp_max} size={32} animate={false} />
          </div>

          {/* Rain bar (fills remaining space) */}
          <div className="flex-1 flex items-center gap-1.5 min-w-0">
            <span className="text-sky-400 text-xs shrink-0">🌧</span>
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-400/80 rounded-full"
                style={{ width: `${r(d.rain_probability)}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-sky-500 shrink-0 w-8 text-right">
              {r(d.rain_probability)}%
            </span>
          </div>

          {/* Wind */}
          <span className="text-xs text-slate-400 font-medium shrink-0 hidden sm:block w-16 text-right">
            💨 {r(d.wind_speed)} km/h
          </span>

          {/* Min / Max */}
          <div className="shrink-0 flex items-center gap-1 text-sm font-bold">
            <span className="text-slate-700">{r(d.temp_max)}°</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-400">{r(d.temp_min)}°</span>
          </div>
        </div>
      ))}
    </div>
  );
}
