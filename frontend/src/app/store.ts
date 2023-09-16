import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import barsReducer from '../features/barsSlice.ts';

export const store = configureStore({
  reducer: {
    bars:barsReducer,
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;