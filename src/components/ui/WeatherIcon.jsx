import { getWeatherInfo } from "../../utils/weatherCodes";

/* ── Individual SVG icons ─────────────────────────────────────────────────── */

const SunIcon = ({ size, animate }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    {/* Rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
      <line
        key={i}
        x1={32 + 18 * Math.cos((deg * Math.PI) / 180)}
        y1={32 + 18 * Math.sin((deg * Math.PI) / 180)}
        x2={32 + 27 * Math.cos((deg * Math.PI) / 180)}
        y2={32 + 27 * Math.sin((deg * Math.PI) / 180)}
        stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"
      />
    ))}
    {/* Glow */}
    <circle cx="32" cy="32" r="15" fill="#FDE68A" className={animate ? "animate-pulse" : ""} />
    {/* Core */}
    <circle cx="32" cy="32" r="11" fill="#FBBF24" />
    <circle cx="32" cy="32" r="7"  fill="#F59E0B" />
  </svg>
);

const CloudIcon = ({ size, shade = "mid" }) => {
  const colors = {
    light: { body: "#F1F5F9", accent: "#E2E8F0" },
    mid:   { body: "#CBD5E1", accent: "#94A3B8" },
    dark:  { body: "#94A3B8", accent: "#64748B" },
  }[shade] ?? { body: "#CBD5E1", accent: "#94A3B8" };

  return (
    <svg width={size} height={size} viewBox="0 0 64 56" fill="none" aria-hidden="true">
      <ellipse cx="32" cy="38" rx="22" ry="14" fill={colors.body} />
      <circle  cx="20" cy="34" r="12"          fill={colors.body} />
      <circle  cx="32" cy="28" r="14"          fill={colors.accent} />
      <circle  cx="44" cy="34" r="11"          fill={colors.body} />
    </svg>
  );
};

const PartlyCloudyIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 72 64" fill="none" aria-hidden="true">
    {/* Sun behind */}
    {[0, 60, 120, 180, 240, 300].map((deg, i) => (
      <line
        key={i}
        x1={22 + 15 * Math.cos((deg * Math.PI) / 180)}
        y1={22 + 15 * Math.sin((deg * Math.PI) / 180)}
        x2={22 + 21 * Math.cos((deg * Math.PI) / 180)}
        y2={22 + 21 * Math.sin((deg * Math.PI) / 180)}
        stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round"
      />
    ))}
    <circle cx="22" cy="22" r="13" fill="#FDE68A" />
    <circle cx="22" cy="22" r="9"  fill="#FBBF24" />
    {/* Cloud in front */}
    <ellipse cx="46" cy="46" rx="20" ry="13" fill="#E2E8F0" />
    <circle  cx="34" cy="42" r="11"           fill="#E2E8F0" />
    <circle  cx="46" cy="36" r="14"           fill="#F1F5F9" />
    <circle  cx="58" cy="42" r="10"           fill="#E2E8F0" />
  </svg>
);

const RainIcon = ({ size, animate }) => (
  <svg width={size} height={size} viewBox="0 0 64 72" fill="none" aria-hidden="true">
    {/* Cloud */}
    <ellipse cx="32" cy="28" rx="21" ry="14" fill="#94A3B8" />
    <circle  cx="19" cy="24" r="12"          fill="#94A3B8" />
    <circle  cx="32" cy="20" r="14"          fill="#CBD5E1" />
    <circle  cx="45" cy="24" r="11"          fill="#94A3B8" />
    {/* Rain drops */}
    {[16, 28, 40].map((x, i) => (
      <line
        key={i}
        x1={x} y1="44" x2={x - 4} y2="60"
        stroke="#38BDF8" strokeWidth="3" strokeLinecap="round"
        className={animate ? "animate-bounce" : ""}
        style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
      />
    ))}
  </svg>
);

const ThunderIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 64 72" fill="none" aria-hidden="true">
    {/* Dark cloud */}
    <ellipse cx="32" cy="26" rx="21" ry="14" fill="#6B7280" />
    <circle  cx="19" cy="22" r="12"          fill="#6B7280" />
    <circle  cx="32" cy="18" r="14"          fill="#4B5563" />
    <circle  cx="45" cy="22" r="11"          fill="#6B7280" />
    {/* Lightning bolt */}
    <polygon
      points="37,38 27,54 34,54 29,68 43,48 36,48"
      fill="#FCD34D"
      stroke="#F59E0B" strokeWidth="1"
    />
  </svg>
);

const SnowIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 64 72" fill="none" aria-hidden="true">
    <ellipse cx="32" cy="28" rx="21" ry="14" fill="#BAE6FD" />
    <circle  cx="19" cy="24" r="12"          fill="#BAE6FD" />
    <circle  cx="32" cy="20" r="14"          fill="#E0F2FE" />
    <circle  cx="45" cy="24" r="11"          fill="#BAE6FD" />
    {/* Snowflakes */}
    {[16, 32, 48].map((x, i) => (
      <g key={i} transform={`translate(${x},${54 + (i % 2) * 4})`}>
        <line x1="-5" y1="0" x2="5" y2="0"  stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="-5" x2="0" y2="5"  stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
        <line x1="-3.5" y1="-3.5" x2="3.5" y2="3.5" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="3.5" y1="-3.5" x2="-3.5" y2="3.5" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    ))}
  </svg>
);

/* ── Main export ──────────────────────────────────────────────────────────── */

/**
 * Renders the correct SVG weather icon for a given WMO weather code.
 *
 * @param {number}  code    - WMO weather code
 * @param {number}  [temp]  - current temperature (reserved for future use)
 * @param {number}  [size=48] - icon px size
 * @param {boolean} [animate=true] - enable bounce/pulse animations
 */
export default function WeatherIcon({ code, temp, size = 48, animate = true }) {
  const { icon } = getWeatherInfo(code ?? 0);

  switch (icon) {
    case "sunny":   return <SunIcon           size={size} animate={animate} />;
    case "partly":  return <PartlyCloudyIcon  size={size} />;
    case "rainy":   return <RainIcon          size={size} animate={animate} />;
    case "thunder": return <ThunderIcon       size={size} />;
    case "snowy":   return <SnowIcon          size={size} />;
    default:        return <CloudIcon         size={size} shade="mid" />;
  }
}
