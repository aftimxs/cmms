import { createSlice, PayloadAction } from '@reduxjs/toolkit'


// Define a type for the slice state
export interface downtimeState {
    id: string,
    reason?: string,
    description?: string,
    start: string,
    end: string,
    shift: number,
}

// Define the initial state using that type
const initialState: downtimeState = {
    id: '',
    start: '',
    end: '',
    shift: 0,
}

const downtimeSlice = createSlice({
  name: 'downtime',
  initialState,
  reducers: {
      downtimeSelected(state, action: PayloadAction<any>) {
          return {
              ...state,
              id: action.payload.id,
              reason: action.payload.reason,
              description: action.payload.description,
              start: action.payload.start,
              end: action.payload.end,
              shift: action.payload.shift,
          }
      },
    }
})

export const { downtimeSelected } = downtimeSlice.actions
export default downtimeSlice.reducer