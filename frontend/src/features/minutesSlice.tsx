import { createSlice, PayloadAction } from '@reduxjs/toolkit'


// Define a type for the slice state
export interface minutesState {
        id: number,
        minute: string,
        count: number,
}

// Define the initial state using that type
const initialState: minutesState[] = []

const minutesSlice = createSlice({
  name: 'minutes',
  initialState,
  reducers: {
      minuteAdded(state, action: PayloadAction<any>) {
          state.push({
              id: action.payload.id,
              minute: action.payload.minute,
              count: action.payload.count,
          })
      },

      //barRemoved(state, action: PayloadAction<any>) {
      //    return state.filter(bar => bar.id !== action.payload.id);
      //},

      minutesReset() {
          return initialState
      },
    }
})

export const { minuteAdded, minutesReset } = minutesSlice.actions
export default minutesSlice.reducer