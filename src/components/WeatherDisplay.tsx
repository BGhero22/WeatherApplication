import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const WeatherDisplay: React.FC = () => {
  const [location, setLocation] = useState<string>(""); // For user input or geolocation
  const [currentWeather, setCurrentWeather] = useState<any | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [forecastDays, setForecastDays] = useState<number>(3);

  const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  // Fetch weather by city


  const fetchWeather = async (city: string) => {
    try {
      const weatherResponse = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
      const forecastResponse = await axios.get(`http://localhost:5000/api/forecast?city=${city}`);
      
      console.log(weatherResponse.data);
      console.log(forecastResponse.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };
  

  // Fetch weather using current location
  const getCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );

          setLocation(weatherResponse.data.name); // Set detected city
          setCurrentWeather(weatherResponse.data);
          setForecast(
            forecastResponse.data.list.filter((_: any, index: number) =>
              forecastDays === 3 ? index % 8 === 0 : index % 4 === 0
            )
          );
        } catch (error) {
          console.error("Error fetching weather:", error);
        }
      },
      (error) => console.error("Geolocation Error:", error)
    );
  };

  // Fetch weather data on load or when location changes
  useEffect(() => {
    if (location) fetchWeather(location);
  }, [location, fetchWeather]);

  return (
    <div>
      <h2>Weather Forecast</h2>

      <button onClick={getCurrentLocationWeather}>Use Current Location</button>

      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={() => fetchWeather(location)}>Get Weather</button>

      <label>
        Show Forecast:
        <select
          value={forecastDays}
          onChange={(e) => setForecastDays(Number(e.target.value))}
        >
          <option value={3}>3 Days</option>
          <option value={5}>5 Days</option>
        </select>
      </label>

      {currentWeather && (
        <div>
          <h3>Current Weather in {currentWeather.name}</h3>
          <p>Temperature: {currentWeather.main.temp}°C</p>
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <p>Wind Speed: {currentWeather.wind.speed} m/s</p>
          <p>Cloudiness: {currentWeather.clouds.all}%</p>
        </div>
      )}

      <h3>Forecast:</h3>
      <div>
        {forecast.length > 0 ? (
          forecast.map((day, index) => (
            <div key={index}>
              <h4>{new Date(day.dt * 1000).toLocaleDateString()}</h4>
              <p>Temperature: {day.main.temp}°C</p>
              <p>Humidity: {day.main.humidity}%</p>
              <p>Wind Speed: {day.wind.speed} m/s</p>
              <p>Cloudiness: {day.clouds.all}%</p>
            </div>
          ))
        ) : (
          <p>No forecast data available.</p>
        )}
      </div>
    </div>
  );
};

export default WeatherDisplay;
