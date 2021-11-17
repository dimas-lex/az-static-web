import { RootState } from "./store";

export const selectIsLoading = (state: RootState) =>  state.rates.status === 'loading' || state.weather.status === 'loading';