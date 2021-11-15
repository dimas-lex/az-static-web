import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchWeather } from './weatherApi';

export interface WeatherState {
  city?: string;
  country?: string;
  status: 'idle' | 'loading' | 'failed' | 'fulfilled';
  forecast?: {
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

export const getWeatherForecast = createAsyncThunk(
  'weather\fetchForecast',
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const response = await fetchWeather(state.weather.country, state.weather.city);
    return response;
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
  }
})

export const selectStatus = (state: RootState) => state.weather.status;
export const selectCountry = (state: RootState) => state.weather.country;
export const selectCity = (state: RootState) => state.weather.city;
export const selectForecast = (state: RootState) => state.weather.forecast;

export default weatherSlice.reducer;