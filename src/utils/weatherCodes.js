export const WEATHER_CODES = {
  0:  { label: "Clear Sky",            icon: "sunny"   },
  1:  { label: "Mainly Clear",         icon: "sunny"   },
  2:  { label: "Partly Cloudy",        icon: "partly"  },
  3:  { label: "Overcast",             icon: "cloudy"  },
  45: { label: "Foggy",                icon: "cloudy"  },
  48: { label: "Icy Fog",              icon: "cloudy"  },
  51: { label: "Light Drizzle",        icon: "rainy"   },
  53: { label: "Drizzle",              icon: "rainy"   },
  55: { label: "Heavy Drizzle",        icon: "rainy"   },
  61: { label: "Light Rain",           icon: "rainy"   },
  63: { label: "Rain",                 icon: "rainy"   },
  65: { label: "Heavy Rain",           icon: "rainy"   },
  71: { label: "Light Snow",           icon: "snowy"   },
  73: { label: "Snow",                 icon: "snowy"   },
  75: { label: "Heavy Snow",           icon: "snowy"   },
  80: { label: "Rain Showers",         icon: "rainy"   },
  81: { label: "Rain Showers",         icon: "rainy"   },
  82: { label: "Violent Showers",      icon: "rainy"   },
  95: { label: "Thunderstorm",         icon: "thunder" },
  96: { label: "Thunderstorm + Hail",  icon: "thunder" },
  99: { label: "Thunderstorm + Hail",  icon: "thunder" },
};

export const getWeatherInfo = (code) =>
  WEATHER_CODES[code] ?? { label: "Unknown", icon: "cloudy" };

/** Returns Tailwind gradient classes that match the weather condition */
export const getBg = (temp, code) => {
  const { icon } = getWeatherInfo(code ?? 0);
  if (icon === "rainy" || icon === "thunder")
    return "from-slate-200 via-blue-100 to-blue-200";
  if (icon === "cloudy")
    return "from-slate-100 via-sky-100 to-slate-200";
  if (icon === "partly")
    return "from-sky-100 via-blue-50 to-slate-100";
  if (temp > 32)
    return "from-amber-100 via-yellow-50 to-sky-100";
  return "from-sky-100 via-cyan-50 to-blue-100";
};
