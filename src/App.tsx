import './App.css';
import React, { useEffect } from 'react';
import { Weather } from './components/Weather';
import { Rates } from './components/Rates/Rates/Rates';
import { getWeatherForecast } from './features/weather/weatherSlice';
import { getRates, selectIsAddRateVisible, selectSelectedRate } from './features/rates/ratesSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { RateDetail } from './components/Rates/RateDetail';
import { selectIsLoading } from './app/selectors';
import { ProgressBar } from './components/ProgressBar';
import { AddRate } from './components/Rates/AddRate';

function App() {
  const dispatch = useAppDispatch();
  const selectedRate = useAppSelector(selectSelectedRate);
  const isAddRateVisible = useAppSelector(selectIsAddRateVisible);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getWeatherForecast());
    dispatch(getRates());
  }, [dispatch]);

  return (
    <div className="App">
      <ProgressBar isVisible={isLoading} />
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

      <AddRate isOpen={isAddRateVisible} />
    </div>
  );
}

export default App;
