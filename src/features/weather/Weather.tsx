
import styles from './Weather.module.css';
import React, { ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectStatus, selectCountry, selectCity, selectForecast, changeLocation } from './weatherSlice';
import countries from '../../common/countries.json';
import { Spinner } from '../../components/Spinner';

export const Weather = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const country = useAppSelector(selectCountry);
  const city = useAppSelector(selectCity);
  const forecast = useAppSelector(selectForecast);

  const onCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeLocation({city: e.target.value}))
  }
  const onCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeLocation({country: e.target.value}))
  }

  return (
    <div className={`${styles.weather} weather `}>
      <div className={`${styles.title} weather-title `}>Weather Info</div>

      <div className={styles.selector}>
        <label className={styles.label}>
          Country:
          <select className={`${styles.select} weather-country `} onChange={onCountryChange} value={country}>
                {countries.map(country => (
                    <option key={country.code} value={country.code}>
                        {country.name}
                    </option>
                ))}
            </select>
        </label>

        <label className={styles.label}>
          City:
          <input className={`${styles.input} weather-city `} type="text" name="city" value={city} onChange={onCityChange} />
        </label>
      </div>

      <div className={`${styles.info} weather-info `}>
        {
          status === 'fulfilled' && (
            <>
              <div>Current Weather for {forecast?.city_name}, {forecast?.country_code} is:</div>
              <div>{forecast?.temp}   &#8451;, {forecast?.weather?.description} </div>
            </>
          )
        }
        <Spinner  isVisible={status === 'loading'} />
        {
          status === 'failed' && ( 'Request failed' )
        }
      </div>
      <div className={styles.line}></div>
    </div>
  );
}