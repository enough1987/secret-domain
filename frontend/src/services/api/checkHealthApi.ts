import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface HealthResponse {
  status: boolean
  db: boolean
  cache: boolean
  version?: string
}

export const checkHealthApi = createApi({
  reducerPath: 'checkHealthApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),
  endpoints: (builder) => ({
    checkHealth: builder.query<HealthResponse, void>({
      query: () => '/',
      keepUnusedDataFor: 0, // Do not cache
    }),
  }),
})

export const { useCheckHealthQuery } = checkHealthApi;