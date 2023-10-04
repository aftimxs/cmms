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

interface product {
    id: number,
    part_num: string,
    rate: number,
}

interface line {
    area: string,
    cell: number,
    id: number,
    machine: {},
    shift: [],
}

export const productionApi = createApi({
    reducerPath: 'productionApi',
    baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/',
  }),
  tagTypes: ['Shift', 'Downtime', 'Speedloss', 'Scrap', 'Product'],
  endpoints: (builder) => ({
      getAllLines: builder.query({
          query: () => 'production-line',
          // transformResponse: (response:never) => {
          //     const x:any[] = []
          //     response.map((line) => x.push({id: line.id, area: line.area, cell: line.cell}))
          //     return x
          // }
      }),
      getLine: builder.query({
          query: ({area, cell, date, number}) =>
              `production-line?area=${area}&cell=${cell}&date=${date}&number=${number}`,
          providesTags: ['Shift'],
          transformResponse: (response) => {
              return response[0]
          }
      }),


      //DOWNTIMES
      getShiftDowntimes: builder.query<comments[], number>({
          query: (shiftId) =>
              `downtime/?shift=${shiftId}`,
          providesTags: (result) =>
              result ?
                  [
                      ...result.map(({ id })=> ({ type: 'Downtime' as const, id})),
                      { type: 'Downtime', id: 'LIST' },
                  ]
                  : { type: 'Downtime', id: 'LIST' },
      }),
      getDowntime: builder.query({
          query: (bar) =>
              `downtime/${bar.id}`,
          providesTags: (_result, _error, bar) => [{ type: 'Downtime', id: bar.id }],
          transformResponse: (response:comments) => {
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
          invalidatesTags: (_result, _error, bar) => [{ type: 'Downtime', id: bar.id }],
      }),


      //SPEED LOSS
      getShiftSpeedLoss: builder.query({
          query: ({shiftId}) =>
              `speedloss/?shift=${shiftId}`,
          providesTags: (result) =>
              result ?
                  [
                      ...result.map(({ id }) => ({ type: 'Speedloss' as const, id })),
                      { type: 'Speedloss', id: 'LIST' },
                  ]
                  : { type: 'Speedloss', id: 'LIST' },
      }),
      getSpeedLoss: builder.query({
          query: (bar) =>
              `speedloss/${bar.id}`,
          providesTags: (_result, _error, bar) => [{ type: 'Speedloss', id: bar.id }],
      }),
      speedlossAdded: builder.mutation({
          query: (speedloss) => ({
              url: `speedloss/`,
              method: 'POST',
              body: speedloss,
          }),
          invalidatesTags: [{ type: 'Speedloss', id: 'LIST' }],
      }),
      speedlossUpdated: builder.mutation({
          query: (speedloss) => ({
              url: `speedloss/${speedloss.id}/`,
              method: 'PATCH',
              body: speedloss,
          }),
          invalidatesTags: (_result, _error, bar) => [{ type: 'Speedloss', id: bar.id }],
      }),


      //SCRAP
      getAllScrap: builder.query<scrap[], number>({
          query: (shift) =>
              `scrap/?shift=${shift}`,
          providesTags: (result) =>
              result ?
                  [
                      ...result.map(({ id }):{id:string, type:string} => ({ type: 'Scrap' as const, id })),
                      { type: 'Scrap', id: 'LIST' },
                  ]
                  : { type: 'Scrap', id: 'LIST' },
      }),
      getScrap: builder.query({
          query: (scrap) =>
              `scrap/${scrap.id}`,
          providesTags: (_result, _error, scrap) => [{ type: 'Scrap', id: scrap.id}],
          transformResponse: (response:scrap) => {
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
          invalidatesTags: (_result, _error, scrap) => [{ type: 'Scrap', id: scrap.id}],
      }),
      scrapDeleted: builder.mutation({
          query: (scrap) => ({
              url: `scrap/${scrap.id}/`,
              method: 'DELETE',
          }),
          invalidatesTags: (_result, _error, scrap) => [{ type: 'Scrap', id: scrap.id}],
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
      getAllProducts: builder.query<product[], void>({
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

export const {
    useGetLineQuery,

    useGetShiftDowntimesQuery,
    useGetDowntimeQuery,
    useDowntimeAddedMutation,
    useDowntimeUpdatedMutation,
    useLazyGetDowntimeQuery,

    useGetShiftSpeedLossQuery,
    useGetSpeedLossQuery,
    useSpeedlossAddedMutation,
    useSpeedlossUpdatedMutation,

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