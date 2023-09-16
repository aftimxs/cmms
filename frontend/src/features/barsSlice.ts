import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import dayjs from "dayjs";

// Define a type for the slice state
export interface barsState {
        id: number,
        startTime: dayjs.Dayjs,
        endTime: dayjs.Dayjs,
        background: 'bg-success' | 'bg-warning' | 'bg-danger',
        length: number,
        parts: number,
}

// Define the initial state using that type
const initialState: barsState[] = []

let lastId:number = 0;

const barsSlice = createSlice({
  name: 'bars',
  initialState,
  reducers: {
      barAdded(state, action: PayloadAction<any>) {
          state.push({
              id: ++lastId,
              startTime: action.payload.startTime,
              endTime: action.payload.endTime,
              background: action.payload.background,
              length: action.payload.length,
              parts: action.payload.parts,
          })
      },

      barRemoved(state, action: PayloadAction<any>) {
          return state.filter(bar => bar.id !== action.payload.id);
      },

      barsReset() {
          lastId = 0;
          return initialState
      },
    }
})

export const { barAdded, barRemoved, barsReset } = barsSlice.actions
export default barsSlice.reducer