# 🌤 Weatheria — Weather Forecast Dashboard Frontend

A clean, modern, and fully responsive weather dashboard frontend built with React 18, Vite, and Tailwind CSS v3. Features a dynamic light-mode UI with smooth animations, real-time weather data, hourly & daily forecasts, sunrise/sunset tracking, and city search powered by Open-Meteo.

<br>

## 🌐 Backend Repository

The backend for this project is maintained separately:

- #### Repository: https://github.com/galihaleanda/go-weather-forecast

<br>

## 🛠 Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool & dev server
- **Tailwind CSS v3** — Utility-first styling
- **Plus Jakarta Sans** — Typography (loaded via Google Fonts)
- **Open-Meteo Geocoding API** — City name → coordinate resolver (public, no API key needed)

<br>

## ✨ Features

- 🌡️ Live current weather — temperature, feels like, humidity, wind, UV index, cloud cover
- 🔍 City search with automatic coordinate resolution via Open-Meteo Geocoding
- 📍 Auto-detect location via browser GPS
- ⏱ 6-hour hourly forecast (horizontal scroll)
- 🕐 24-hour detail grid with UV & cloud cover
- 📅 3-day and 7-day extended forecasts
- 🌅 Sunrise & sunset card with animated daylight progress bar
- 📊 Temperature comparison — today vs yesterday
- 🎨 Dynamic background gradient that changes with weather conditions
- 💀 Loading skeleton placeholders for all sections
- 📱 Fully responsive — mobile, tablet, and desktop

<br>

## 🔹 Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/galihaleanda/weather-forecast.git
cd weather-forecast
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Install Tailwind CSS

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

### 4️⃣ Configure `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 5️⃣ Configure `src/index.css`

Replace the contents with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

<br>

## ⚙️ Configuration

### API Base URL

The frontend points to the Go backend at `localhost:8080` by default. To change this, edit:

```js
// src/constants/api.js
export const API_BASE = "http://localhost:8080/api/v1";
```

### CORS — Backend Setup Required

Since the frontend runs on a different port than the backend, you must enable CORS in your Go backend:

```bash
go get github.com/gin-contrib/cors
```

```go
// main.go
import "github.com/gin-contrib/cors"

r.Use(cors.New(cors.Config{
    AllowOrigins: []string{
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
    },
    AllowMethods: []string{"GET", "POST", "OPTIONS"},
    AllowHeaders: []string{"Origin", "Content-Type", "Accept"},
}))
```

<br>

## ▶️ Running the App

```bash
npm run dev
```

```
Frontend will start at:
http://localhost:5173
```

> ⚠️ Make sure the Go backend is running on `http://localhost:8080` first.  
> If the backend is unreachable, the app will automatically fall back to demo data.

<br>

## 📡 API Endpoint Used

### Get Weather Forecast

```
GET /api/v1/weather?lat={latitude}&lon={longitude}
```

**Example:**

```bash
curl "http://localhost:8080/api/v1/weather?lat=-6.2&lon=106.8"
```

**Expected Response Structure:**

```json
{
  "location": {
    "latitude": -6.2,
    "longitude": 106.8,
    "timezone": "Asia/Jakarta"
  },
  "current": {
    "time": "2025-01-01T12:00",
    "temperature": 32.1,
    "apparent_temperature": 36.4,
    "humidity": 78,
    "wind_speed": 15.2,
    "wind_direction": 225,
    "rain_probability": 35,
    "weather_code": 2,
    "uv_index": 7.2,
    "cloud_cover": 45,
    "temp_min": 26.0,
    "temp_max": 34.0
  },
  "forecast_6h": [
    {
      "time": "2025-01-01T12:00",
      "temperature": 32.1,
      "rain_probability": 20,
      "wind_speed": 14,
      "weather_code": 2,
      "uv_index": 7.2,
      "cloud_cover": 40
    }
  ],
  "forecast_24h": [ ... ],
  "forecast_3days": [
    {
      "date": "2025-01-01",
      "temp_max": 34.0,
      "temp_min": 26.0,
      "weather_code": 2,
      "rain_probability": 20,
      "wind_speed": 15
    }
  ],
  "forecast_7days": [ ... ],
  "sun": {
    "sunrise": "2025-01-01T05:48",
    "sunset": "2025-01-01T18:12"
  },
  "compare": {
    "today_avg": 30.2,
    "yesterday_avg": 28.5
  }
}
```

<br>

## 🧪 Example Usage

#### Fetch weather for Jakarta

```bash
curl "http://localhost:8080/api/v1/weather?lat=-6.2&lon=106.8"
```

#### Fetch weather for Surabaya

```bash
curl "http://localhost:8080/api/v1/weather?lat=-7.25&lon=112.75"
```

#### Health check

```bash
curl "http://localhost:8080/health"
# → { "status": "ok" }
```

<br>

## 📝 Notes

- If the backend is unreachable, the app automatically shows **demo data** with a warning banner — no crash or blank screen
- All timestamps from Open-Meteo are in **ISO 8601 format**, displayed in **24-hour local time**
- The `compare` (yesterday vs today) section uses hourly data: today = hours 0–23, yesterday = hours 24–47 from the 7-day forecast window
- WMO weather codes (0–99) are mapped to labels and icon types in `src/utils/weatherCodes.js`
- The app uses **no external icon libraries** — all weather icons are custom inline SVGs
