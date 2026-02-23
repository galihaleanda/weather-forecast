export const API_BASE = "http://localhost:8080/api/v1";

const now = Date.now();
const hour = 3600000;
const day  = 86400000;

export const MOCK_DATA = {
  city: "Jakarta",
  location: { latitude: -6.2, longitude: 106.8, timezone: "Asia/Jakarta" },

  current: {
    time:                 new Date(now).toISOString(),
    temperature:          32,
    apparent_temperature: 36,
    humidity:             78,
    wind_speed:           15,
    wind_direction:       225,
    rain_probability:     35,
    weather_code:         2,
    uv_index:             7.2,
    cloud_cover:          45,
    temp_min:             26,
    temp_max:             34,
  },

  forecast_6h: Array.from({ length: 6 }, (_, i) => ({
    time:             new Date(now + i * hour).toISOString(),
    temperature:      32 - i * 0.6,
    rain_probability: Math.min(80, 20 + i * 8),
    wind_speed:       14 + i * 0.5,
    weather_code:     i < 3 ? 2 : 61,
  })),

  forecast_24h: Array.from({ length: 24 }, (_, i) => ({
    time:             new Date(now + i * hour).toISOString(),
    temperature:      26 + 6 * Math.sin(((i - 6) / 24) * Math.PI * 2),
    rain_probability: Math.max(0, Math.round(30 + 20 * Math.sin((i / 24) * Math.PI * 4))),
    wind_speed:       Math.round(10 + 8 * Math.sin((i / 12) * Math.PI)),
    weather_code:     i > 14 && i < 20 ? 61 : i > 19 ? 3 : 2,
    uv_index:         i >= 6 && i <= 18 ? +(7 * Math.sin(((i - 6) / 12) * Math.PI)).toFixed(1) : 0,
    cloud_cover:      Math.round(30 + 35 * Math.abs(Math.sin((i / 8) * Math.PI))),
  })),

  forecast_3days: [0, 1, 2].map((d) => ({
    date:             new Date(now + d * day).toISOString(),
    temp_max:         33 - d * 1.2,
    temp_min:         25 + d * 0.4,
    rain_probability: 20 + d * 18,
    weather_code:     d === 0 ? 2 : d === 1 ? 61 : 3,
  })),

  forecast_7days: [0, 1, 2, 3, 4, 5, 6].map((d) => ({
    date:             new Date(now + d * day).toISOString(),
    temp_max:         33 - d * 0.6,
    temp_min:         25 + d * 0.3,
    rain_probability: 10 + d * 10,
    wind_speed:       12 + d * 1.2,
    weather_code:     d < 2 ? 2 : d < 4 ? 61 : d === 5 ? 95 : 3,
  })),

  sun: {
    sunrise: new Date(new Date().setHours(5, 48, 0, 0)).toISOString(),
    sunset:  new Date(new Date().setHours(18, 12, 0, 0)).toISOString(),
  },

  compare: {
    today_avg:     30.2,
    yesterday_avg: 28.5,
  },
};