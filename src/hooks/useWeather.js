import { useState, useEffect, useCallback } from "react";
import { API_BASE, MOCK_DATA } from "../constants/api";

/**
 * Custom hook that manages weather fetching, city search, and GPS detection.
 * Returns: { data, cityName, loading, error, useMock, search, autoDetect }
 */
export function useWeather() {
  const [data,     setData]     = useState(null);
  const [cityName, setCityName] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [useMock,  setUseMock]  = useState(false);

  /* ── Core fetch ─────────────────────────────────────────────────────────── */
  const fetchWeather = useCallback(async (lat, lon, city) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/weather?lat=${lat}&lon=${lon}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setCityName(city || json.city || `${(+lat).toFixed(2)}, ${(+lon).toFixed(2)}`);
      setUseMock(false);
    } catch {
      // Graceful fallback to demo data
      setData(MOCK_DATA);
      setCityName(city || "Jakarta (Demo)");
      setUseMock(true);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ── City search ─────────────────────────────────────────────────────────── */
  const search = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Try backend geocoder
      const res = await fetch(`${API_BASE}/geocode?city=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("not found");
      const geo = await res.json();
      await fetchWeather(geo.latitude, geo.longitude, geo.city || query);
    } catch {
      // 2. Open-Meteo public geocoding API fallback
      try {
        const r2 = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`
        );
        const g2 = await r2.json();
        if (g2.results?.length) {
          const { latitude, longitude, name } = g2.results[0];
          await fetchWeather(latitude, longitude, name);
        } else {
          throw new Error("City not found");
        }
      } catch {
        // 3. Full demo fallback
        setData({ ...MOCK_DATA, city: query });
        setCityName(`${query} (Demo)`);
        setUseMock(true);
        setLoading(false);
      }
    }
  }, [fetchWeather]);

  /* ── GPS auto-detect ─────────────────────────────────────────────────────── */
  const autoDetect = useCallback(() => {
    if (!navigator.geolocation) {
      fetchWeather(-6.2, 106.8, "Jakarta");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => fetchWeather(coords.latitude, coords.longitude, "My Location"),
      ()            => fetchWeather(-6.2, 106.8, "Jakarta (Default)"),
    );
  }, [fetchWeather]);

  /* ── Load default city on mount ──────────────────────────────────────────── */
  useEffect(() => {
    fetchWeather(-6.2, 106.8, "Jakarta");
  }, [fetchWeather]);

  return { data, cityName, loading, error, useMock, search, autoDetect };
}
