import { useState } from "react";

const SearchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const LocateIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    <path d="M12 7a5 5 0 1 0 5 5" />
  </svg>
);

/**
 * Responsive search bar with city input + GPS button.
 * Stacks vertically on very small screens, inline on sm+.
 */
export default function LocationSearch({ onSearch, onAutoDetect, loading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) onSearch(q);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-0">
      <form onSubmit={handleSubmit} className="flex gap-2">
        {/* Text input */}
        <div className="relative flex-1 min-w-0">
          <span className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city…"
            autoComplete="off"
            className="
              w-full
              pl-10 sm:pl-11 pr-3 sm:pr-4
              py-3 sm:py-3.5
              rounded-xl sm:rounded-2xl
              border border-white/70
              bg-white/75 backdrop-blur-md
              text-slate-700 placeholder-slate-400
              text-sm sm:text-base font-medium
              outline-none
              focus:ring-2 focus:ring-sky-300 focus:border-sky-300
              shadow-sm
              transition-all duration-200
            "
          />
        </div>

        {/* Search button */}
        <button
          type="submit"
          disabled={loading}
          className="
            px-4 sm:px-5
            py-3 sm:py-3.5
            rounded-xl sm:rounded-2xl
            bg-sky-400 hover:bg-sky-500
            text-white font-bold
            text-sm sm:text-base
            shadow
            active:scale-95
            transition-all duration-150
            disabled:opacity-50 disabled:cursor-not-allowed
            whitespace-nowrap
          "
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            "Search"
          )}
        </button>

        {/* GPS button */}
        <button
          type="button"
          onClick={onAutoDetect}
          disabled={loading}
          title="Use my location"
          className="
            flex items-center gap-1.5 sm:gap-2
            px-3 sm:px-4
            py-3 sm:py-3.5
            rounded-xl sm:rounded-2xl
            bg-white/75 backdrop-blur-md
            border border-white/70
            text-slate-600 hover:text-sky-600
            text-sm font-medium
            shadow
            hover:bg-sky-50/80
            active:scale-95
            transition-all duration-150
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <LocateIcon />
          <span className="hidden sm:inline whitespace-nowrap">My Location</span>
        </button>
      </form>
    </div>
  );
}
