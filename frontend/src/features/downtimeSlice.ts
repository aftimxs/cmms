import { createSlice, PayloadAction } from '@reduxjs/toolkit'


// Define a type for the slice state
export interface downtimeState {
    id: string,
    start: string,
    end: string,
    background: 'bg-success' | 'bg-warning' | 'bg-danger' | '',
    length: number,
    parts: number,
    shift: number,
}

// Define the initial state using that type
const initialState: downtimeState = {
    id: '',
    start: '',
    end: '',
    background: '',
    length: 0,
    parts: 0,
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
              start: action.payload.start,
              end: action.payload.end,
              background: action.payload.background,
              length: action.payload.length,
              parts: action.payload.parts,
              shift: action.payload.shift,
          }
      },
    }
})

export const { downtimeSelected } = downtimeSlice.actions
export default downtimeSlice.reducer