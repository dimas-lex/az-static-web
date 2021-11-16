import './App.css';
import React, { useEffect } from 'react';
import { Weather } from './features/weather/Weather';
import { Rates } from './features/rates/Rates';
import { getWeatherForecast } from './features/weather/weatherSlice';
import { getRates, selectSelectedRate } from './features/rates/ratesSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { RateDetail } from './features/rates/RateDetail';

function App() {
  const dispatch = useAppDispatch();
  const selectedRate = useAppSelector(selectSelectedRate);

  useEffect(() => {
    dispatch(getWeatherForecast());
    dispatch(getRates());
  }, [dispatch]);

  console.log(selectedRate)
  return (
    <div className="App">
      <Weather />
      <div className="AppRates" >
        <Rates />
      </div>
      {
        selectedRate && (
          <div className="AppRateDetail" >
            <RateDetail rate={selectedRate} />
          </div>
        )
      }
    </div>
  );
}

export default App;
