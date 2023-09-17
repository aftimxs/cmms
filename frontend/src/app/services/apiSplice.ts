import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


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
          query: ({area, cell, date, number}) => `production-line?area=${area}&cell=${cell}&date=${date}&number=${number}`,
      })
  }),
})

export const {useGetLineQuery} = productionApi
export const useGetLineState = productionApi.endpoints.getLine.useQueryState;