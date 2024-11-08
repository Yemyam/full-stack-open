import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY


const Weather = ({country}) => {
    const [weather, setWeather] = useState([])
    useEffect(() => {
        axios
        .get('https://api.openweathermap.org/data/2.5/weather?q=' + country.capital + '&appid=' + api_key)
        .then(response => {
            setWeather([response.data])
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])
    if(weather.length > 0){
        return(
        <div>
            <h2>Weather in {country.name.common}</h2>
            <div>temperature {(weather[0].main.temp - 273.15).toFixed(2)} Celcius</div>
        </div>
        )
    }
}

export default Weather