import './App.css';
import React, { useEffect } from 'react';
import {Weather} from './features/weather/Weather';
import { getWeatherForecast } from './features/weather/weatherSlice';
import { useAppDispatch } from './app/hooks';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWeatherForecast());
  }, [dispatch]);

  return (
    <div className="App">
       <Weather />
    </div>
  );
}

export default App;
