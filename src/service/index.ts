import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@/service/interceptor/axiosBaseQuery'

export const entryService = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_API
  }),
  endpoints: () => ({}),
  reducerPath: 'services',
  tagTypes: []
})
