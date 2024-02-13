import React, { useState } from 'react';
import axios from 'axios';
import styles from './Home.module.css'; // Import CSS module

function Home(props) {
  const [searchText, setSearchText] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: searchText,
          key: 'add618a96fd146e19834f6d42f4f97bb'
        }
      });

      if (response.data.results.length === 0) {
        setErrorMessage('No results found for the provided location. Please try again.');
        setWeatherData(null);
        return;
      }

      const { lat, lng } = response.data.results[0].geometry;

      const weatherResponse = await axios.get('https://ai-weather-by-meteosource.p.rapidapi.com/current', {
        params: {
          lat: lat,
          lon: lng,
          language: 'en',
          timezone: 'auto',
          units: 'us'
        },
        headers: {
          'X-RapidAPI-Key': '390151c81fmsh0f377021460049cp15f4ebjsn813857554b7a',
          'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
        }
      });
      setWeatherData(weatherResponse.data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while fetching weather data. Please try again.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const renderSnowfall = () => {
    if (!weatherData) return null;
    const { precipitation } = weatherData.current;
    if (precipitation && precipitation.type === 'snow') {
      return <p>Snowfall: Yes</p>;
    } else {
      return <p>Snowfall: No</p>;
    }
  };

  return (
    <div>
       <nav className={styles.navbar}>
      <a className={styles.navbarBrand} href="#">Weather App</a>
      <div className={styles.navbarNav}>
        <a className={styles.navLink} href="#">Home</a>
        <a className={styles.navLink} href="#">About</a>
        <a className={styles.navLink} href="#">Contact</a>
      </div>
    </nav>
      <div className={styles.snowCanadaTheme}>
      <h1 className={styles.heading}>Search the Current Weather</h1>
        <div className={styles.centeredSearchBox}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Enter a city or state name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className={styles.searchButton} onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {errorMessage && (
          <div className={styles.errorMessage}>
            {errorMessage}
          </div>
        )}
        {weatherData && (
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <h3>Weather Information</h3>
              <p>Temperature: {weatherData.current.temperature}°F</p>
              <p>Summary: {weatherData.current.summary}</p>
              <p>Wind Speed: {weatherData.current.wind.speed} mph</p>
              {renderSnowfall()}
              {/* Add more weather information as needed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

