import './App.css';
import React  from 'react';
import { Weather } from './components/Weather';
import { Rates } from './components/Rates/Rates/Rates';
import { selectIsAddRateVisible, selectSelectedRate } from './features/rates/ratesSlice';
import { useAppSelector } from './app/hooks';
import { RateDetail } from './components/Rates/RateDetail';
import { selectIsLoading } from './app/selectors';
import { ProgressBar } from './components/ProgressBar';
import { AddRate } from './components/Rates/AddRate';
import { HeaderBox } from './components/Header/HeaderBox';
import { FontContext } from './app/context';

function App() {
  const selectedRate = useAppSelector(selectSelectedRate);
  const isAddRateVisible = useAppSelector(selectIsAddRateVisible);
  const isLoading = useAppSelector(selectIsLoading);


  return (
    <FontContext.Provider value={12}>
    <div className="App">
      <ProgressBar isVisible={isLoading} />
      <HeaderBox title="SOME TITLE" />
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

    </FontContext.Provider>
  );
}

export default App;
