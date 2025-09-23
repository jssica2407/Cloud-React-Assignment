import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = ({ defaultCity }) => {
  const [city, setCity] = useState(defaultCity); // City name (input)
  const [weatherData, setWeatherData] = useState(null); // Weather data
  const [error, setError] = useState(null); // Error message
  const [loading, setLoading] = useState(false); // Status loading

  // Function to handle changes of city
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Function to get latitude and longitude from city
  const fetchCoordinates = async (cityName) => {
    const geoAPIKey = '036f40b26b8d4e06a5ab435b6af0d1f2'; 
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${geoAPIKey}`
      );
      if (response.data.results.length > 0) {
        return {
          lat: response.data.results[0].geometry.lat,
          lng: response.data.results[0].geometry.lng,
        };
      } else {
        throw new Error('City not found');
      }
    } catch (err) {
      throw new Error('Geocoding API error');
    }
  };

  //Function to take data from API
  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { lat, lng } = await fetchCoordinates(city); // get coordinate
      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m`
      );
      setWeatherData(weatherResponse.data); // save weather's data
    } catch (err) {
      setError(err.message); // save error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]); 

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

      {loading && <p>Loading...</p>} {/* Show Loading */}
      
      {error && <p className="error">{error}</p>} {/* Show error */}

      {weatherData ? (
        <div>
          <h2>Weather in {city}</h2>
          <p>Temperature: {weatherData.hourly.temperature_2m[0]}°C</p> {/* Show temperature*/}
        </div>
      ) : null}
    </div>
  );
};

export default WeatherWidget;
