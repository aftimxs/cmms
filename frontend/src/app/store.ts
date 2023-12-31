import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import barsReducer from '../features/barsSlice.ts';
import lineReducer from '../features/lineParamsSlice.ts';
import downtimeReducer from '../features/downtimeSlice.ts';
import minutesReducer from '../features/minutesSlice.tsx';
import {productionApi} from "./services/apiSplice.ts";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    line:lineReducer,
    bars:barsReducer,
    downtime:downtimeReducer,
    minutes:minutesReducer,
    [productionApi.reducerPath]: productionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productionApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
setupListeners(store.dispatch);