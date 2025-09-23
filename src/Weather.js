import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = ({ defaultCity }) => {
  const [city, setCity] = useState(defaultCity); // Save name of the city that's inputted by user
  const [weatherData, setWeatherData] = useState(null); // Save data from API 
  const [error, setError] = useState(null); // Save error if it happens.

  // Handle user input
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Function : Take data from API
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=temperature_2m`
      );
      setWeatherData(response.data);
      setError(null); // Reset error if data succeed taken
    } catch (err) {
      setError('City not found or API error');
      setWeatherData(null); // Reset weather's data if there's error
    }
  };

  // Effect to take weather's data for every changes
  useEffect(() => {
    fetchWeatherData();
  }, [city]); // fetchWeatherData if the city change

  return (
    <div className="card">
      <div className="kv">
        <label className="h2" htmlFor="city">Search for City:</label>
        <input
          id="city"
          type="text"
          className="input"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
        <button className="button" onClick={fetchWeatherData}>
          Search
        </button>
      </div>

      {error && <p className="error">{error}</p>} {/* Show error */}

      {weatherData ? (
        <div>
          <h2>Weather in {city}</h2>
          <p>Temperature: {weatherData.hourly.temperature_2m[0]}°C</p>
        </div>
      ) : (
        <p>Loading...</p> // Show loading
      )}
    </div>
  );
};

export default WeatherWidget;
