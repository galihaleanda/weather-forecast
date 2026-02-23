/** ISO → "HH:MM" (24-hour) */
export const fmt24 = (iso) => {
  if (!iso) return "--:--";
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit", minute: "2-digit", hour12: false,
  });
};

/** ISO → "Mon", "Tue" … */
export const fmtDay = (iso) => {
  if (!iso) return "---";
  return new Date(iso).toLocaleDateString("en-US", { weekday: "short" });
};

/** ISO → "Jan 1" */
export const fmtDate = (iso) => {
  if (!iso) return "---";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric",
  });
};

/** ISO → "Monday, January 1, 2025" */
export const fmtLong = (date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

/** ISO → "HH:MM:SS" live clock */
export const fmtClock = (date) =>
  date.toLocaleTimeString("en-GB", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  });
