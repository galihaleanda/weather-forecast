import { useWeather }     from "./hooks/useWeather";
import { getBg }           from "./utils/weatherCodes";

import SectionTitle  from "./components/layout/SectionTitle";
import ErrorCard     from "./components/layout/ErrorCard";
import LocationSearch from "./components/search/LocationSearch";
import HeroWeather   from "./components/weather/HeroWeather";
import Forecast6h    from "./components/weather/Forecast6h";
import Forecast24h   from "./components/weather/Forecast24h";
import Forecast3Days from "./components/weather/Forecast3Days";
import Forecast7Days from "./components/weather/Forecast7Days";
import SunriseSunset from "./components/weather/SunriseSunset";
import WeatherCompare from "./components/weather/WeatherCompare";

export default function App() {
  const { data, cityName, loading, error, useMock, search, autoDetect } = useWeather();

  const bg = data
    ? getBg(data.current?.temperature, data.current?.weather_code)
    : "from-sky-100 via-blue-50 to-cyan-50";

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${bg} transition-all duration-1000`}
      style={{ fontFamily: "'Plus Jakarta Sans', 'Poppins', system-ui, sans-serif" }}
    >
      {/* ── Global styles ───────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        /* Fade-in animation */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .fade-in { animation: fadeUp 0.45s ease-out both; }
        .fade-in-1 { animation: fadeUp 0.45s 0.05s ease-out both; }
        .fade-in-2 { animation: fadeUp 0.45s 0.12s ease-out both; }
        .fade-in-3 { animation: fadeUp 0.45s 0.20s ease-out both; }
        .fade-in-4 { animation: fadeUp 0.45s 0.28s ease-out both; }
        .fade-in-5 { animation: fadeUp 0.45s 0.36s ease-out both; }
        .fade-in-6 { animation: fadeUp 0.45s 0.44s ease-out both; }
        .fade-in-7 { animation: fadeUp 0.45s 0.52s ease-out both; }

        /* Hide scrollbar but keep scroll functionality */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── Page wrapper ────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 py-5 sm:py-7 md:py-10 space-y-4 sm:space-y-5 md:space-y-7">

        {/* ── App header ──────────────────────────────────────────────── */}
        <header className="text-center fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-700 tracking-tight leading-tight">
            🌤 Weath<span className="text-sky-400">eria</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-medium mt-0.5">
            Your premium weather intelligence dashboard
          </p>
        </header>

        {/* ── Demo data banner ─────────────────────────────────────────── */}
        {useMock && (
          <div className="
            bg-amber-50/90 border border-amber-200
            rounded-xl sm:rounded-2xl
            px-4 py-2.5 sm:py-3
            text-xs sm:text-sm text-amber-700
            text-center
            fade-in
          ">
            ⚡ Demo data shown — connect backend at{" "}
            <code className="font-mono bg-amber-100 px-1 rounded text-amber-800">
              Golang Programming Language
            </code>{" "}
            for live weather
          </div>
        )}

        {/* ── Search bar ───────────────────────────────────────────────── */}
        <div className="fade-in-1">
          <LocationSearch onSearch={search} onAutoDetect={autoDetect} loading={loading} />
        </div>

        {/* ── Error state ──────────────────────────────────────────────── */}
        {error && <ErrorCard message={error} />}

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div className="fade-in-2">
          <HeroWeather data={data} cityName={cityName} loading={loading} />
        </div>

        {/* ── 6-hour forecast ──────────────────────────────────────────── */}
        {(loading || data?.forecast_6h?.length > 0) && (
          <section className="fade-in-3">
            <SectionTitle title="Next 6 Hours" sub="Hour-by-hour forecast" />
            <Forecast6h data={data} loading={loading} />
          </section>
        )}

{/* ── Sunrise / Sunset + Compare side-by-side ──────────────────── */}
{(loading || data) && (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 fade-in-3 items-start">
    <div className="flex flex-col">
      <SectionTitle title="Sunrise & Sunset" />
      <SunriseSunset data={data} loading={loading} />
    </div>
    <div className="flex flex-col">
      <SectionTitle title="Temperature vs Yesterday" />
      <WeatherCompare data={data} loading={loading} />
    </div>
  </div>
)}

        {/* ── 3-day forecast ───────────────────────────────────────────── */}
        {(loading || data?.forecast_3days?.length > 0) && (
          <section className="fade-in-4">
            <SectionTitle title="3-Day Forecast" sub="Near-term outlook" />
            <Forecast3Days data={data} loading={loading} />
          </section>
        )}

        {/* ── 7-day forecast ───────────────────────────────────────────── */}
        {(loading || data?.forecast_7days?.length > 0) && (
          <section className="fade-in-5">
            <SectionTitle title="7-Day Forecast" sub="Weekly extended forecast" />
            <Forecast7Days data={data} loading={loading} />
          </section>
        )}

        {/* ── 24-hour detail ───────────────────────────────────────────── */}
        {(loading || data?.forecast_24h?.length > 0) && (
          <section className="fade-in-6">
            <SectionTitle title="24-Hour Detail" sub="Full day breakdown with UV & cloud data" />
            <Forecast24h data={data} loading={loading} />
          </section>
        )}

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-slate-400 pb-4 fade-in-7">
          Powered by Open-Meteo · Weatheria Dashboard ·
          Built with <span className="text-red-400">♥</span>
        </footer>

      </div>
    </div>
  );
}