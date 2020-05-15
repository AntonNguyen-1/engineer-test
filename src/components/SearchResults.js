import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, ListItem, List } from '@material-ui/core';

function SearchResults({ countries, setCountry }) {
    return (
        <List>
            <Typography
                variant="subtitle2"
                gutterBottom
            >
                {countries.map(country => (
                    <ListItem key={country.alpha2Code}>
                        <Link
                            onClick={() => setCountry(country)}
                            to={`/country/${country.alpha2Code.toLowerCase()}`}
                        >
                            <img src={country.flag} className='small-flag' alt='flag.img'/>
                            {country.name}
                        </Link>
                    </ListItem>
                ))}
            </Typography>
        </List>
    )
}

export default SearchResults;