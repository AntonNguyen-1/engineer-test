import React, { useState } from 'react';
import axios from 'axios';
import SearchResults from '../components/SearchResults.js';

const RESTCOUNTRIES_URL = 'https://restcountries.eu/rest/v2/name/';

function Main({ setCountry }) {
    const [inputValue, setValue] = useState();
    const [countries, setCountries] = useState([]);

    const findCountry = (event) => {
        const value = event.target.value;
        setValue(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(RESTCOUNTRIES_URL + inputValue);
            setCountries(response.data);
        } catch (error) {
            console.error(error);
            setCountries([]);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Find country: </label>
                <input
                    onInput={findCountry}
                />
                <button
                    type='submit'
                    disabled={!inputValue}
                >
                    Submit
                 </button>
            </form>
            <SearchResults
                setCountry={setCountry} 
                countries={countries}
            />
        </div>
    );
}

export default Main;
