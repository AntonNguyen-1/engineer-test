import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const WEATHER_URL = 'http://api.weatherstack.com/current?/'
const ACCES_KEY = '1098d61a52c14d0b97f5fe99c2b90edf';

function CountryPage({ country }) {
    const [weather, setWeather] = useState()

    const getWeather = (capital) => async () => {
        const response = await axios.get(`${WEATHER_URL}`, {
            params: {
                access_key: ACCES_KEY,
                query: capital
            }
        })
        setWeather(response.data.current)
    }

    if(!country) return <Redirect to='/' />
    return (
        <>
            {country && <div>
                <p>Name: {country.name}</p>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <p>latlng: {country.latlng.join(',')}</p>
                <img alt='countryImg' src={country.flag}></img>
                <button
                    onClick={getWeather(country.capital)}
                >
                    Capital Weather
            </button>
                {weather && <Fragment>
                    <p>temperature: {weather.temperature}</p>
                    <img src={weather.weather_icons} alt='weather_icon.png'></img>
                    <p>wind_speed: {weather.wind_speed}</p>
                    <p>precip: {weather.precip}</p>
                </Fragment>}
            </div>}
        </>
    )
}

export default CountryPage;