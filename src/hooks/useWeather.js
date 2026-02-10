import { useState } from "react";
import { fetchWeatherByCity } from "../Services/weatherApi";

const useWeather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric");

  const getWeather = async (city, selectedUnit = unit) => {
  if (!city.trim()) return;

  try {
    setLoading(true);
    setError("");
    const result = await fetchWeatherByCity(city, selectedUnit);
    setData(result);
  } catch {
    setError("City not found!");
    setData(null);
  } finally {
    setLoading(false);
  }
};


  const toggleUnit = () => {
  setUnit(prev => {
    const newUnit = prev === "metric" ? "imperial" : "metric";
    if (data) {
      getWeather(data.name, newUnit); // refetch with new unit
    }
    return newUnit;
  });
};

  return { data, loading, error, unit, getWeather, toggleUnit };
};

export default useWeather;