import React, { useState } from "react";
import axios from "axios";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // use .env file

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found!");
      setWeather(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") getWeather();
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear": return <WiDaySunny size={80} color="#FFD700" />;
      case "Clouds": return <WiCloud size={80} color="#B0C4DE" />;
      case "Rain": return <WiRain size={80} color="#00BFFF" />;
      case "Snow": return <WiSnow size={80} color="#ADD8E6" />;
      case "Thunderstorm": return <WiThunderstorm size={80} color="#FF4500" />;
      default: return <WiDaySunny size={80} color="#FFD700" />;
    }
  };

  const getBackground = (main) => {
    switch (main) {
      case "Clear": return "clear-sky.png";
      case "Clouds": return "cloudy.png";
      case "Rain": return "heavy-rain.png";
      case "Snow": return "snowy.png";
      case "Thunderstorm": return "thunder.png";
      default: return "clear-sky.png";
    }
  };

  return (
    <div
      className="weather-app"
      style={{
        backgroundImage: weather ? `url(${process.env.PUBLIC_URL}/${getBackground(weather.weather[0].main)})` : "url(clear.jpg)"
      }}
    >
      <div className="weather-container">
        <h2>Weather App</h2>
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={getWeather}>Get Weather</button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <div className="weather-icon">{getWeatherIcon(weather.weather[0].main)}</div>
            <h3>{weather.name}, {weather.sys.country}</h3>
            <p className="temp">{Math.round(weather.main.temp)} °C</p>
            <p className="condition">{weather.weather[0].main} - {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
