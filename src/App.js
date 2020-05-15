import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.js';
import CoutryPage from './pages/CountryPage.js';
import './App.css';
import 'typeface-roboto';

function App() {
  const [country, setCountry] = useState(null);
  return (
    <Router>
      <Switch>
        <Route path="/country/:id">
          <CoutryPage
            setCountry={setCountry}
            country={country}
          />
        </Route>
        <Route path="/" exact>
          <MainPage 
            setCountry={setCountry}
            country={country}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
