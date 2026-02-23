import { useState, useEffect } from "react";
import WeatherIcon from "../ui/WeatherIcon";
import Skeleton    from "../ui/Skeleton";
import { getWeatherInfo } from "../../utils/weatherCodes";
import { uvLevel, windDirLabel, r } from "../../utils/helpers";
import { fmtLong, fmtClock } from "../../utils/format";

/* ── Stat card (used inside the grid) ──────────────────────────────────────── */
function StatCard({ icon, label, value, sub, subColor }) {
  return (
    <div className="
      flex flex-col items-center justify-center gap-0.5
      bg-white/50 backdrop-blur-sm
      rounded-xl sm:rounded-2xl
      p-3 sm:p-4
      border border-white/70
      shadow-sm
      hover:shadow-md hover:bg-white/65
      transition-all duration-200
    ">
      <span className="text-xl sm:text-2xl leading-none">{icon}</span>
      <span className="text-sm sm:text-base font-extrabold text-slate-700 mt-1 leading-tight">{value}</span>
      {sub && (
        <span className={`text-xs font-semibold leading-none ${subColor ?? "text-slate-400"}`}>{sub}</span>
      )}
      <span className="text-xs text-slate-400 mt-0.5 text-center leading-none">{label}</span>
    </div>
  );
}

/* ── Loading skeleton layout ─────────────────────────────────────────────── */
function HeroSkeleton() {
  return (
    <div className="w-full rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 bg-white/40 shadow-lg animate-pulse">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-28" />
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-2 w-full justify-center">
          <Skeleton className="h-28 w-28 rounded-full" />
          <div className="flex flex-col items-center sm:items-start gap-2">
            <Skeleton className="h-20 w-48" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 w-full mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 sm:h-24" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────────── */
export default function HeroWeather({ data, cityName, loading }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (loading) return <HeroSkeleton />;
  if (!data)   return null;

  const { current } = data;
  const weatherInfo = getWeatherInfo(current?.weather_code ?? 0);
  const temp        = r(current?.temperature, 0);
  const uv          = uvLevel(current?.uv_index ?? 0);

  const stats = [
    {
      icon: "💧", label: "Humidity",
      value: `${r(current?.humidity)}%`,
    },
    {
      icon: "💨", label: "Wind",
      value: `${r(current?.wind_speed)} km/h`,
      sub: windDirLabel(current?.wind_direction),
    },
    {
      icon: "🔆", label: "UV Index",
      value: (current?.uv_index ?? 0).toFixed(1),
      sub: uv.label, subColor: uv.color,
    },
    {
      icon: "☁️", label: "Cloud",
      value: `${r(current?.cloud_cover)}%`,
    },
    {
      icon: "🌧️", label: "Rain",
      value: `${r(current?.rain_probability)}%`,
    },
    {
      icon: "🌡️", label: "Feels",
      value: `${r(current?.apparent_temperature ?? temp)}°`,
    },
  ];

  return (
    <div className="
      w-full rounded-2xl sm:rounded-3xl
      bg-white/40 backdrop-blur-md
      border border-white/60
      shadow-xl
      overflow-hidden
      fade-in
    ">
      <div className="p-5 sm:p-8 md:p-10">

        {/* ── Location + clock row ─────────────────────────────────────── */}
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1 mb-5 sm:mb-6">
          <div>
            <div className="flex items-center gap-1.5">
              <svg className="text-sky-500 shrink-0" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="text-sky-500 font-bold text-xs sm:text-sm tracking-wide uppercase truncate max-w-[200px] sm:max-w-none">
                {cityName || "—"}
              </span>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
              {fmtLong(now)}
            </p>
          </div>
          <div className="font-mono text-slate-400 text-xs sm:text-sm font-semibold tabular-nums shrink-0">
            {fmtClock(now)}
          </div>
        </div>

        {/* ── Temperature + icon row ───────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-6">
          {/* Left: numbers */}
          <div className="text-center sm:text-left">
            {/* Big temperature */}
            <div className="flex items-start justify-center sm:justify-start leading-none">
              <span className="text-7xl sm:text-8xl md:text-9xl font-black text-slate-700 tracking-tighter tabular-nums">
                {temp}
              </span>
              <span className="text-3xl sm:text-4xl font-bold text-slate-400 mt-2 sm:mt-3 ml-1">
                °C
              </span>
            </div>

            {/* Condition label */}
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-600 mt-1">
              {weatherInfo.label}
            </p>

            {/* Min / Max */}
            <p className="text-sm sm:text-base text-slate-400 font-semibold mt-0.5">
              <span className="text-sky-400">↓</span> {r(current?.temp_min, temp - 3)}°
              <span className="mx-2 text-slate-300">:</span>
              <span className="text-orange-400">↑</span> {r(current?.temp_max, temp + 3)}°
            </p>
          </div>

          {/* Right: weather icon */}
          <div className="drop-shadow-lg shrink-0">
            <WeatherIcon
              code={current?.weather_code}
              temp={temp}
              size={window.innerWidth < 640 ? 100 : 130}
            />
          </div>
        </div>

        {/* ── Stats grid: 3 col mobile → 6 col desktop ────────────────── */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mt-6 sm:mt-8">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </div>

      </div>
    </div>
  );
}
