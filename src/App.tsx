import './App.css';
import React, { useEffect } from 'react';
import { Weather } from './features/weather/Weather';
import { Rates } from './features/rates/Rates';
import { getWeatherForecast } from './features/weather/weatherSlice';
import { getRates } from './features/rates/ratesSlice';
import { useAppDispatch } from './app/hooks';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWeatherForecast());
    dispatch(getRates());
  }, [dispatch]);

  return (
    <div className="App">
      <Weather />
      <Rates />
    </div>
  );
}

export default App;
