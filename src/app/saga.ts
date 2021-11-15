
import { all } from 'redux-saga/effects';
import { changeLocationSaga } from '../features/weather/weatherSlice';
import { fetchRatesSaga } from '../features/rates/ratesSlice';

export default function* rootSaga() {
  yield all([changeLocationSaga(), fetchRatesSaga()]);
}