import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from "dayjs";


// Define a type for the slice state
export interface lineState {
    area: string,
    date: string,
    cell: string,
    number: string,
}

// Define the initial state using that type
const initialState: lineState = {
    area: 'Welding',
    cell: '1',
    date: dayjs().format('YYYY-MM-DD'),
    number: '1',
}


const lineParamslice = createSlice({
  name: 'lineParams',
  initialState,
  reducers: {
      areaAdded(state, action: PayloadAction<any>) {
          return {
              ...state,
              area: action.payload
          }
      },
      dateAdded(state, action: PayloadAction<any>) {
          return {
              ...state,
              date: action.payload
          }
      },
      cellAdded(state, action: PayloadAction<any>) {
          return {
              ...state,
              cell: action.payload
          }
      },
      numberAdded(state, action: PayloadAction<any>) {
          return {
              ...state,
              number: action.payload
          }
      },
      lineReset() {
          return initialState
      },
    }
})

export const { areaAdded, dateAdded, cellAdded, numberAdded } = lineParamslice.actions
export default lineParamslice.reducer