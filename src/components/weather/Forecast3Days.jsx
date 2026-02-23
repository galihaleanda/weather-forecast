import WeatherIcon  from "../ui/WeatherIcon";
import Skeleton     from "../ui/Skeleton";
import { getWeatherInfo } from "../../utils/weatherCodes";
import { fmtDay, fmtDate } from "../../utils/format";
import { r } from "../../utils/helpers";

/**
 * 3-day outlook cards.
 * Mobile: 1 col stacked | sm+: 3 col row
 */
export default function Forecast3Days({ data, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-36 sm:h-40" />
        ))}
      </div>
    );
  }

  if (!data?.forecast_3days?.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {data.forecast_3days.map((d, i) => {
        const { label } = getWeatherInfo(d.weather_code ?? 0);
        const isToday = i === 0;

        return (
          <div
            key={i}
            className={`
              rounded-2xl sm:rounded-3xl p-4 sm:p-5
              border shadow-sm
              hover:shadow-md hover:-translate-y-0.5
              transition-all duration-200
              ${isToday
                ? "bg-sky-400/10 border-sky-200/70 ring-1 ring-sky-300/40"
                : "bg-white/55 backdrop-blur-sm border-white/70"
              }
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className={`font-extrabold text-base sm:text-lg ${isToday ? "text-sky-600" : "text-slate-700"}`}>
                  {isToday ? "Today" : fmtDay(d.date)}
                </p>
                <p className="text-xs text-slate-400 font-medium">{fmtDate(d.date)}</p>
              </div>
              <WeatherIcon code={d.weather_code} temp={d.temp_max} size={44} animate={false} />
            </div>

            {/* Condition */}
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mb-3">{label}</p>

            {/* Min / Max temperature bar */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-700 leading-none">
                {r(d.temp_max)}°
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-400 leading-none">
                {r(d.temp_min)}°
              </span>
            </div>

            {/* Rain probability */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-400 rounded-full transition-all duration-700"
                  style={{ width: `${Math.round(d.rain_probability ?? 0)}%` }}
                />
              </div>
              <span className="text-xs font-bold text-sky-500 whitespace-nowrap">
                🌧 {r(d.rain_probability)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
