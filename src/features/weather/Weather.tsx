
import styles from './Weather.module.css';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectStatus, selectCountry, selectCity, selectForecast } from './weatherSlice';


export const Weather = () => {
  const status = useAppSelector(selectStatus);
  const country = useAppSelector(selectCountry);
  const city = useAppSelector(selectCity);
  const forecast = useAppSelector(selectForecast);


  return (
    <div className={styles.weather}>
      <div className={styles.title}>Weather Info</div>
      <div className={styles.selector}>
        <div className={styles.country}>Country: {country}</div>
        <div className={styles.city}>City: {city}</div>
      </div>
      <div className={styles.info}>
        {
          status === 'fulfilled' && (
            <>
              <div>Current Weather is:</div>
              <div>{forecast?.temp}   &#8451;, {forecast?.weather?.description} </div>
            </>
          )
        }
        {
          status === 'loading' && (
            'loading'
          )
        }
      </div>
      <div className={styles.line}></div>
    </div>
  );
}