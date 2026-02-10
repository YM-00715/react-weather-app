import React, { useState } from "react";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import useWeather from "../../hooks/useWeather";
import "./Weather.css";
import { fetchWeatherByCity } from "../../Services/weatherApi";

const Weather = () => {
  const [city, setCity] = useState("");
  const { data, loading, error, unit, getWeather, toggleUnit } = useWeather();
  const [darkMode, setDarkMode] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") getWeather(city);
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear": return <WiDaySunny size={80} />;
      case "Clouds": return <WiCloud size={80} />;
      case "Rain": return <WiRain size={80} />;
      case "Snow": return <WiSnow size={80} />;
      case "Thunderstorm": return <WiThunderstorm size={80} />;
      default: return <WiDaySunny size={80} />;
    }
  };

  return (
    <div className={`weather-app ${darkMode ? "dark" : ""}`}>
      <div className="weather-container">
        <h2>Weather App</h2>

        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={() => getWeather(city)}>Search</button>
        </div>

        <button className="unit-toggle" onClick={toggleUnit}>
          {unit === "metric" ? "°C → °F" : "°F → °C"}
        </button>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {data && (
          <div className="weather-info">
            <div className="weather-icon">
              {getWeatherIcon(data.weather[0].main)}
            </div>
            <h3>{data.name}, {data.sys.country}</h3>
            <p className="temp">
              {Math.round(data.main.temp)}°{unit === "metric" ? "C" : "F"}
            </p>
            <p className="condition">
              {data.weather[0].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;