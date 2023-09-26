import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BaseQueryArg} from "@reduxjs/toolkit/dist/query/baseQueryTypes";

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
  tagTypes: ['Shift', 'Downtime', 'Scrap'],
  endpoints: (builder) => ({
      getAllLines: builder.query({
          query: () => 'production-line',
      }),
      getLine: builder.query({
          query: ({area, cell, date, number}) =>
              `production-line?area=${area}&cell=${cell}&date=${date}&number=${number}`,
          providesTags: ['Shift'],
          transformResponse: (response) => {
              // @ts-ignore
              return response[0]
          }
      }),
      getShiftDowntimes: builder.query({
          query: ({shiftId}) =>
              `downtime/?shift=${shiftId}`,
          providesTags: ['Downtime'],
          transformResponse: (response:comments) => {
              // @ts-ignore
              return response
          }
      }),
      getDowntime: builder.query({
          query: ({id}) =>
              `downtime/${id}`,
          providesTags: ['Downtime'],
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
          }),
          invalidatesTags: ['Downtime', 'Shift'],
      }),
      downtimeUpdated: builder.mutation({
          query: (downtime) => ({
              url: `downtime/${downtime.id}/`,
              method: 'PATCH',
              body: downtime,
          }),
          invalidatesTags: ['Downtime', 'Shift'],
      }),
      getAllScrap: builder.query({
          query: ({shift}) =>
              `scrap/?shift=${shift}`,
          providesTags: ['Scrap'],
      }),
      getScrap: builder.query({
          query: ({id}) =>
              `scrap/${id}`,
          providesTags: ['Scrap'],
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
          }),
          invalidatesTags: ['Scrap', 'Shift'],
      }),
      scrapUpdated: builder.mutation({
          query: (scrap) => ({
              url: `scrap/${scrap.id}/`,
              method: 'PATCH',
              body: scrap,
          }),
          invalidatesTags: ['Scrap', 'Shift'],
      }),
      scrapDeleted: builder.mutation({
          query: (scrap) => ({
              url: `scrap/${scrap.id}/`,
              method: 'DELETE',
          }),
          invalidatesTags: ['Scrap', 'Shift'],
      }),
      productionInfoAdded: builder.mutation({
          query: (info) => ({
              url: 'product-info/',
              method: 'POST',
              body: info
          }),
          invalidatesTags: ['Shift']
      }),
      getAllProducts: builder.query({
          query: () => 'product',
      }),
      getProduct: builder.query({
          query: ({id}) => `product/${id}/`,
      }),
      productUpdated: builder.mutation({
          query: (order) => ({
              url: `order/${order.id}/`,
              method: 'PATCH',
              body: order
          }),
          invalidatesTags: ['Shift']
      }),
      quantityUpdated: builder.mutation({
          query: (order) => ({
              url: `order/${order.id}/`,
              method: 'PATCH',
              body: order,
          }),
          invalidatesTags: ['Shift'],
      }),
      orderAdded: builder.mutation({
          query: (order) => ({
              url: 'order/',
              method: 'POST',
              body: order
          }),
          invalidatesTags: ['Shift']
      }),
  }),
})

// @ts-ignore
export const {
    useGetLineQuery,

    useGetShiftDowntimesQuery,
    useGetDowntimeQuery,
    useDowntimeAddedMutation,
    useDowntimeUpdatedMutation,
    useLazyGetDowntimeQuery,

    useGetAllScrapQuery,
    useGetScrapQuery,
    useScrapAddedMutation,
    useScrapUpdatedMutation,
    useScrapDeletedMutation,
    useLazyGetScrapQuery,

    useProductionInfoAddedMutation,

    useGetProductQuery,
    useGetAllProductsQuery,
    useProductUpdatedMutation,
    useQuantityUpdatedMutation,
    useOrderAddedMutation,
} = productionApi
export const useGetLineState = productionApi.endpoints.getLine.useQueryState;