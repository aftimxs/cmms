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
  tagTypes: ['Shift', 'Downtime', 'Scrap', 'Product'],
  endpoints: (builder) => ({
      getAllLines: builder.query({
          query: () => 'production-line',
          transformResponse: (response) => {
              const x = []
              response.map((line) => x.push({id: line.id, area: line.area, cell: line.cell}))
              return x
          }
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


      //DOWNTIMES
      getShiftDowntimes: builder.query({
          query: ({shiftId}) =>
              `downtime/?shift=${shiftId}`,
          providesTags: (result) =>
              result ?
                  [
                      ...result.map(({ id }) => ({ type: 'Downtime' as const, id })),
                      { type: 'Downtime', id: 'LIST' },
                  ]
                  : { type: 'Downtime', id: 'LIST' },
          transformResponse: (response:comments) => {
              // @ts-ignore
              return response
          }
      }),
      getDowntime: builder.query({
          query: (bar) =>
              `downtime/${bar.id}`,
          providesTags: (result, error, bar) => [{ type: 'Downtime', id: bar.id }],
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
          invalidatesTags: [{ type: 'Downtime', id: 'LIST' }],
      }),
      downtimeUpdated: builder.mutation({
          query: (downtime) => ({
              url: `downtime/${downtime.id}/`,
              method: 'PATCH',
              body: downtime,
          }),
          invalidatesTags: (result, error, bar) => [{ type: 'Downtime', id: bar.id }],
      }),


      //SCRAP
      getAllScrap: builder.query({
          query: ({shift}) =>
              `scrap/?shift=${shift}`,
          providesTags: (result) =>
              result ?
                  [
                      ...result.map(({ id }) => ({ type: 'Scrap' as const, id })),
                      { type: 'Scrap', id: 'LIST' },
                  ]
                  : { type: 'Scrap', id: 'LIST' },
      }),
      getScrap: builder.query({
          query: (scrap) =>
              `scrap/${scrap.id}`,
          providesTags: (result, error, scrap) => [{ type: 'Scrap', id: scrap.id}],
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
          invalidatesTags: [{ type: 'Scrap', id: 'LIST' }],
      }),
      scrapUpdated: builder.mutation({
          query: (scrap) => ({
              url: `scrap/${scrap.id}/`,
              method: 'PATCH',
              body: scrap,
          }),
          invalidatesTags: (result, error, scrap) => [{ type: 'Scrap', id: scrap.id}],
      }),
      scrapDeleted: builder.mutation({
          query: (scrap) => ({
              url: `scrap/${scrap.id}/`,
              method: 'DELETE',
          }),
          invalidatesTags: (result, error, scrap) => [{ type: 'Scrap', id: scrap.id}],
      }),


      productionInfoAdded: builder.mutation({
          query: (info) => ({
              url: 'product-info/',
              method: 'POST',
              body: info
          }),
          invalidatesTags: ['Shift']
      }),


      //PRODUCTS
      getAllProducts: builder.query({
          query: () => 'product',
      }),
      getProduct: builder.query({
          query: (product) => `product/${product.id}/`,
          providesTags: ['Shift'],
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
      shiftAdded: builder.mutation({
          query: (shift) => ({
              url: 'shift/',
              method: 'POST',
              body: shift
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

    useShiftAddedMutation,
} = productionApi
export const useGetLineState = productionApi.endpoints.getLine.useQueryState;