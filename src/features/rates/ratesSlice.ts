import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { put, delay, takeEvery, debounce } from 'redux-saga/effects';
import { RootState } from '../../app/store';
import { fetchRates } from './ratesApi';

export type TRate = {
  betaId: string;
  currency: "EURO" | "USD";
  id: string;
  name: string;
  timestamp: number;
  value: number;
  subValue: number;
  description: string;
}

export interface RateState {
  quantity: number,
  status: 'idle' | 'loading' | 'failed' | 'fulfilled';
  rates?: Array<TRate>;
  selectedRate: TRate | null;
};

const initialState: RateState = {
  quantity: 123,
  status: 'idle',
  rates: [],
  selectedRate: null,
};

export const rateDetailClosed = createAction('rates/rateDetailClosed');
export const rateSelected = createAction<TRate["id"]>('rates/rateSelected');
export const updateQuantity = createAction<number>('rates/updateQuantity');

export const getRates = createAsyncThunk(
  'rates/getRates',
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    try {
      const response = await fetchRates(state.rates.quantity);
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
    builder
      .addCase(getRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRates.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getRates.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.rates = action.payload;
      })
      .addCase(updateQuantity, (state, action) => {
        state.quantity = action.payload;
      })
      .addCase(rateDetailClosed, (state) => {
        state.selectedRate = null;
      })
      .addCase(rateSelected, (state, action) => {
        const id = action.payload;
        const rate = state.rates?.find(r => r.id === id);
        state.selectedRate = rate ? rate : null;
      })
  }
});

export const selectQuantity = (state: RootState) => state.rates.quantity;
export const selectStatus = (state: RootState) => state.rates.status;
export const selectRates = (state: RootState) => state.rates.rates;
export const selectSelectedRate = (state: RootState) => state.rates.selectedRate;


function* onFetchRatesSaga() {
  yield delay(15000);
  yield put(getRates() as any);
}

function* onUpdateQuantity() {
  yield put(getRates() as any);
}

export function* fetchRatesSaga() {
  yield takeEvery(getRates.fulfilled, onFetchRatesSaga);
  yield debounce(500, updateQuantity, onUpdateQuantity)
}

export default weatherSlice.reducer;