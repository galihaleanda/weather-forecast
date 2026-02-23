/** Wind degrees → compass label */
export const windDirLabel = (deg) => {
  const dirs = ["N","NE","E","SE","S","SW","W","NW"];
  return dirs[Math.round((deg ?? 0) / 45) % 8];
};

/** UV index → { label, color, bg } */
export const uvLevel = (uv) => {
  if (uv <= 2) return { label: "Low",       color: "text-emerald-600", bg: "bg-emerald-100" };
  if (uv <= 5) return { label: "Moderate",  color: "text-yellow-600",  bg: "bg-yellow-100"  };
  if (uv <= 7) return { label: "High",      color: "text-orange-600",  bg: "bg-orange-100"  };
  return         { label: "Very High", color: "text-red-600",     bg: "bg-red-100"     };
};

/** Clamp a number within [min, max] */
export const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

/** Round to integer, guard undefined */
export const r = (n, fallback = 0) => Math.round(n ?? fallback);
