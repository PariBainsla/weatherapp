import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const fetchWeather = async (city) => {
        try {
            const apiKey = 'ac66e2bfdda279b14fafa5f8d199c13e'; // Ideally, use an environment variable
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`);
            setWeatherData(response.data);
            setError(null);
            
        } catch (error) {
            setWeatherData(null);
            setError('Error fetching weather data');
        }
    };

    const handleClick = () => {
        if (city) {
            fetchWeather(city);
        } else {
            setError('Please enter a city');
        }
    };

    return (
        <div className='weather-container'>
            <input 
                type='text' 
                placeholder='Enter City Name' 
                value={city} 
                onChange={handleCityChange} 
                className='input' 
            />
            <button onClick={handleClick} className='btn'>Get Weather</button>
            {error && <p className='error'>{error}</p>}
            {weatherData && (
                <div className='weather-info'>
                    <h2>{weatherData.name}</h2>
                    <p>{weatherData.weather[0].description}</p>
                    <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
