import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { put, delay, takeEvery, debounce, select } from 'redux-saga/effects';
import { RootState } from '../../app/store';
import { fetchRates, submitRateApi } from './ratesApi';

export interface IRate  {
  betaId: string;
  currency: "EURO" | "USD";
  id: string;
  name: string;
  timestamp: number;
  value: number;
  subValue: number;
  description: string;
}

export interface ISubmitRate {
  firstName: string;
  lastName: string;
  email: string;
  value: number;
  subValue: number;
  subValue1: number;
  subValue2: number;
  subValue3: number;
  subValue4: number;
  subValue5: number;
  subValue6: number;
  age: number;
  phone: number;
}
export interface RateState {
  quantity: number,
  status: 'idle' | 'loading' | 'failed' | 'fulfilled';
  rates?: Array<IRate>;
  selectedRate: IRate | null;
  isAddRateVisible: boolean;
};

const initialState: RateState = {
  quantity: 1500,
  status: 'idle',
  rates: [],
  selectedRate: null,
  isAddRateVisible: false,
};

export const toggleAddRateVisibility = createAction('rates/toggleAddRateVisibility');
export const rateDetailClosed = createAction('rates/rateDetailClosed');
export const rateSelected = createAction<IRate["id"]>('rates/rateSelected');
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

export const submitRate = createAsyncThunk(
  'rates/submitRate',
  async (rate: ISubmitRate) => {
    return await submitRateApi(rate as any as ISubmitRate);
  }
)

export const weatherSlice = createSlice({
  name: "Weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitRate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRates.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(submitRate.fulfilled, (state, action) => {
        state.status = 'fulfilled';
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
      .addCase(toggleAddRateVisibility, (state) => {
        state.isAddRateVisible = !state.isAddRateVisible;
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
export const selectIsAddRateVisible = (state: RootState) => state.rates.isAddRateVisible;


function* doSomeWorkload() {
  console.log('start doSomeWorkload')
  const rates: IRate[] = yield select(selectRates);
  if (!rates) return;
  const newSorted = [...rates].sort((a, b) => ((a.timestamp / a.subValue / a.value) - (b.timestamp / b.subValue / b.value)));
  const newSorted2 = newSorted?.sort((a, b) => (a.subValue / a.value) - (b.subValue / b.value));
  const newSorted3 = newSorted2?.sort((a, b) => (a.timestamp / a.value) - (b.timestamp / b.value));
  const newSorted4 = newSorted3?.sort((a, b) => (a.subValue / a.timestamp) - (b.subValue / b.timestamp));
  console.log('end doSomeWorkload')
  return newSorted4
}

function* onFetchRatesSaga() {
  yield delay(15000);
  yield put(getRates() as any);
}

function* onUpdateQuantity() {
  yield put(getRates() as any);
}

export function* fetchRatesSaga() {
  yield takeEvery(getRates.fulfilled, onFetchRatesSaga);
  yield takeEvery(getRates.fulfilled, doSomeWorkload);
  yield debounce(100, getRates.fulfilled, doSomeWorkload);
  yield debounce(500, updateQuantity, onUpdateQuantity)
}

export default weatherSlice.reducer;