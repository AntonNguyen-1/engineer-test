import React from 'react';
import { Link } from 'react-router-dom';

function SearchResults({ countries, setCountry }) {
    return (
        <ul>
            {countries.map(country => (
                <li key={country.alpha2Code}>
                    <Link
                        onClick={() => setCountry(country)}
                        to={`/country/${country.alpha2Code.toLowerCase()}`}
                    >
                        {country.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default SearchResults;