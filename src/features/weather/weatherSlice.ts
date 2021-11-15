import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { put, debounce } from 'redux-saga/effects';
import { RootState } from '../../app/store';
import { fetchWeather } from './weatherApi';

export interface WeatherState {
  city?: string;
  country?: string;
  status: 'idle' | 'loading' | 'failed' | 'fulfilled';
  forecast?: {
    city_name: string;
    country_code: string;
    timezone: string;
    wind_spd: string;
    wind_cdir_full: string;
    wind_cdir: string;
    sunrise: string;
    sunset: string;
    temp: number;
    clouds: number;
    weather: {
      description: string
    },
  };
}

const initialState: WeatherState = {
  city: 'Krakow',
  country: 'PL',
  status: 'idle',
};

export const changeLocation = createAction<{ city?: string; country?: string }>('weather/changeLocation');

export const getWeatherForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    try {

      const response = await fetchWeather(state.weather.country, state.weather.city);
      return response;

    } catch (err) {
      console.log(err)
      thunkApi.rejectWithValue(err)
    }
  }
)


export const weatherSlice = createSlice({
  name: "Weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWeatherForecast.pending, (state) => {
      state.status = 'loading';
    })
      .addCase(getWeatherForecast.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getWeatherForecast.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.forecast = action.payload;
      })
      .addCase(changeLocation, (state, action) => {
        state.status = 'loading';
        if (action.payload.city) {
          state.city = action.payload.city;
        }
        if (action.payload.country) {
          state.country = action.payload.country;
        }
      })
  }
});

export const selectStatus = (state: RootState) => state.weather.status;
export const selectCountry = (state: RootState) => state.weather.country;
export const selectCity = (state: RootState) => state.weather.city;
export const selectForecast = (state: RootState) => state.weather.forecast;


function* onChangeLocationSaga() {
  yield put(getWeatherForecast() as any);
}

export function* changeLocationSaga() {
  yield debounce(500, changeLocation, onChangeLocationSaga);
}

export default weatherSlice.reducer;