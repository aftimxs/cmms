import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface comments {
    id: string,
    reason: string,
    description: string,
    start: string,
    end: string,
    shift:number,
}

interface scrap {
    id: string,
    reason: string,
    comments: string,
    pieces: number,
    minute: string,
    shift:number,
}

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
      getDowntime: builder.query({
          query: ({id}) =>
              `downtime/${id}`,
          transformResponse: (response:comments) => {
              // @ts-ignore
              return response
          },
      }),
      downtimeAdded: builder.mutation({
          query: (downtime) => ({
              url: `downtime/`,
              method: 'POST',
              body: downtime,
          })
      }),
      downtimeUpdated: builder.mutation({
          query: (downtime) => ({
              url: `downtime/${downtime.id}/`,
              method: 'PATCH',
              body: downtime,
          })
      }),
      getScrap: builder.query({
          query: ({id}) =>
              `scrap/${id}`,
          transformResponse: (response:scrap) => {
              // @ts-ignore
              return response
          },
      }),
      scrapAdded: builder.mutation({
          query: (scrap) => ({
              url: `scrap/`,
              method: 'POST',
              body: scrap,
          })
      }),
      scrapUpdated: builder.mutation({
          query: (scrap) => ({
              url: `scrap/${scrap.id}/`,
              method: 'PATCH',
              body: scrap,
          })
      }),
  }),
})

export const {
    useGetLineQuery,
    useGetShiftDowntimesQuery,
    useGetDowntimeQuery,
    useDowntimeAddedMutation,
    useDowntimeUpdatedMutation,
    useGetScrapQuery,
    useScrapAddedMutation,
    useScrapUpdatedMutation,
    useLazyGetScrapQuery,
    useLazyGetDowntimeQuery
} = productionApi
export const useGetLineState = productionApi.endpoints.getLine.useQueryState;