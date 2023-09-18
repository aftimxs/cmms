import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import dayjs from "dayjs";

// Define a type for the slice state
export interface lineState {
    area: string,
    cell: number,
    id: number,
    machine: [],
    scrap: [],
    shift: [],
}

// Define the initial state using that type
//const initialState: lineState = {
//    area: 'Welding',
//    cell: '1',
//    date: dayjs().format('YYYY-MM-DD'),
//    number: '1',
//}

export const productionApi = createApi({
    reducerPath: 'productionApi',
    baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/',
  }),
  tagTypes: ['Line'],
  endpoints: (builder) => ({
      getAllLines: builder.query({
          query: () => 'production-line',
      }),
      getLine: builder.query({
          query: ({area, cell, date, number}) =>
              `production-line?area=${area}&cell=${cell}&date=${date}&number=${number}`,
          transformResponse: (response) => {
              // @ts-ignore
              return response[0]
          }
      }),
      getDowntimes: builder.query({
          query: ({startTime, shiftId}) =>
              `downtime/${dayjs(startTime, 'DD-MM-YYYY HH:mm:ss Z').format('DDMMYYHHmm')}${shiftId}`,
          transformResponse: (response) => {
              // @ts-ignore
              return response
          }
      }),
  }),
})

export const {useGetLineQuery, useGetDowntimesQuery} = productionApi
export const useGetLineState = productionApi.endpoints.getLine.useQueryState;