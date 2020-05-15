import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Button, Typography, Avatar, CircularProgress, Grid, Card, CardContent, CardHeader } from '@material-ui/core';

const WEATHER_URL = 'http://api.weatherstack.com/current?/'
const ACCES_KEY = '1098d61a52c14d0b97f5fe99c2b90edf';

function CountryPage({ country }) {
    const [weather, setWeather] = useState();
    const [loading, setLoading] = useState(false);

    const getWeather = (capital) => async () => {
        setLoading(true);
        const response = await axios.get(`${WEATHER_URL}`, {
            params: {
                access_key: ACCES_KEY,
                query: capital
            }
        })
        setWeather(response.data.current);
        setLoading(false);
    }

    if (!country) return <Redirect to='/' />
    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            className='country-container'
        >
            <Card>
                <CardHeader title='Country info' />
                <CardContent>
                    {country && <div>
                        <img alt='countryImg' src={country.flag} className='medium-flag' />
                        <Typography variant='subtitle2'>Name: <Typography component='span' variant="overline" gutterBottom>{country.name}</Typography></Typography>
                        <Typography variant='subtitle2'>Capital: <Typography component='span' variant="overline" gutterBottom>{country.capital}</Typography></Typography>
                        <Typography variant='subtitle2'>Population: <Typography component='span' variant="overline" gutterBottom>{country.population}</Typography></Typography>
                        <Typography variant='subtitle2'>latlng: <Typography component='span' variant="overline" gutterBottom>{country.latlng.join(',')}</Typography></Typography>
                        <Button color='primary' disabled={loading}
                            onClick={getWeather(country.capital)}
                        >
                            Capital Weather
                        </Button>
                        {loading && <CircularProgress />}
                        {weather && !loading && <Fragment>
                            <Avatar src={weather.weather_icons[0]} alt='weather_icon.png'></Avatar>
                            <Typography variant='subtitle2'>temperature: <Typography component='span' variant="overline" gutterBottom>{weather.temperature}</Typography></Typography>
                            <Typography variant='subtitle2'>wind_speed: <Typography component='span' variant="overline" gutterBottom>{weather.wind_speed}</Typography></Typography>
                            <Typography variant='subtitle2'>precip: <Typography component='span' variant="overline" gutterBottom>{weather.precip}</Typography></Typography>
                        </Fragment>}
                    </div>}
                </CardContent>
            </Card>
        </Grid>
    )
}

export default CountryPage;