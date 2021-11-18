
import { all } from 'redux-saga/effects';
import { changeLocationSaga } from '../features/weather/weatherSlice';
import { fetchRatesSaga } from '../features/rates/ratesSlice';
import { main } from '../features/experiment/sagas';

export default function* rootSaga() {
  yield all([changeLocationSaga(), fetchRatesSaga(), main()]);
}

