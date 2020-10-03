import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (country) => {
    const [weatherData, setWeatherData] = useState(null)

    
  useEffect(() => {
    const weatherAPI = process.env.REACT_APP_API_KEY


    axios
    .get(`http://api.weatherstack.com/current?access_key=${weatherAPI}&query=${country.country.capital}`)
    .then(response => {
        setWeatherData(response.data.current)
    })

  }, [country])

 return weatherData ? 
         (
            <div>
                <h2> Weather in {country.country.capital}</h2>
                <p>Temperature: {weatherData.temperature}</p>
                <img src={weatherData.weather_icons} alt="weather icon"></img>
                <p>Wind: {weatherData.wind_speed} mph direction {weatherData.wind_dir}</p>
            </div>
        )
        :
        (
            <div>
                gathering weather data
            </div>
        )
    
}

export default Weather