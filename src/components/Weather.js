// src/components/Weather.js
import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "a824d8cde61d2dd2cef65d62463d2f7a"; // Your OpenWeatherMap API key

  const getWeather = async () => {
    if (!location) {
      setError("Please enter a location.");
      return;
    }

    try {
      setError(""); // Clear previous errors
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );

      // Log the response to inspect
      console.log("API Response:", response);

      if (response.status === 200) {
        setWeather(response.data);
      } else {
        setError("Unable to fetch weather data.");
      }
    } catch (err) {
      // Log the error for debugging
      console.error("Error fetching weather data:", err);
      if (err.response) {
        if (err.response.status === 404) {
          setError("Location not found. Please try another city.");
        } else {
          setError(`Error: ${err.response.data.message}`);
        }
      } else {
        setError("An error occurred while fetching weather data.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Weather Forecast</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
        style={styles.input}
      />
      <button onClick={getWeather} style={styles.button}>
        Get Weather
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {weather && (
        <div style={styles.weatherContainer}>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    marginRight: "10px",
  },
  button: {
    padding: "10px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  weatherContainer: {
    marginTop: "20px",
    backgroundColor: "#f2f2f2",
    padding: "20px",
    borderRadius: "10px",
    display: "inline-block",
    textAlign: "left",
  },
};

export default Weather;
