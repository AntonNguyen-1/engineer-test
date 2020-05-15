import React, { useState } from 'react';
import axios from 'axios';
import SearchResults from '../components/SearchResults.js';
import { Button, TextField, Grid, CircularProgress } from '@material-ui/core';

const RESTCOUNTRIES_URL = 'https://restcountries.eu/rest/v2/name/';

function Main({ setCountry }) {
    const [inputValue, setValue] = useState();
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);

    const findCountry = (event) => {
        const value = event.target.value;
        setValue(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await axios.get(RESTCOUNTRIES_URL + inputValue);
            setCountries(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setCountries([]);
            setLoading(false);
        }
    }

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
            className='country-container'
        >
            <div className='page-container'>
                <form className='form-container' onSubmit={onSubmit}>
                    <TextField
                        id="standard-basic"
                        label="Find country"
                        onInput={findCountry}
                    />
                    <Button
                        variant="contained"
                        color='primary'
                        type='submit'
                        disabled={!inputValue || loading}
                    >
                        Submit
                 </Button>
                </form>
                {loading && <CircularProgress />}
                <SearchResults
                    setCountry={setCountry}
                    countries={countries}
                />
            </div>
        </Grid>
    );
}

export default Main;
