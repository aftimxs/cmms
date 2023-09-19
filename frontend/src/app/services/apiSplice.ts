import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


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
      getShiftDowntimes: builder.query({
          query: ({shiftId}) =>
              `downtime/?shift=${shiftId}`,
          transformResponse: (response) => {
              // @ts-ignore
              return response
          }
      }),
      downtimeAdded: builder.mutation({
          query: (body) => ({
              url: `downtime/`,
              method: 'POST',
              body,
          })
      })
  }),
})

export const {
    useGetLineQuery,
    useGetShiftDowntimesQuery,
    useDowntimeAddedMutation,
} = productionApi
export const useGetLineState = productionApi.endpoints.getLine.useQueryState;