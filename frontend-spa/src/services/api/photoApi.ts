import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IPhoto } from '../models';

export const photoApi = createApi({
  reducerPath: 'photoApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),
  tagTypes: ['photos'],
  endpoints: (builder) => ({
    getPhotos: builder.query<IPhoto[], number | void>({
      query: (limit = 10) => `/photos?_limit=${limit}`,
      providesTags: ['photos'],
      keepUnusedDataFor: 60 * 60,
    }),
  }),
})

export const { useGetPhotosQuery } = photoApi