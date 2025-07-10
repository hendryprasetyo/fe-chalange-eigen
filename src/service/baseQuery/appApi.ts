import { entryService } from '@/service'
import { TResponseApiSuccess, TResponseArticles } from '@/types/type'

export const serviceApp = entryService.injectEndpoints({
  endpoints: builder => ({
    getTopHeadlines: builder.query<
      TResponseApiSuccess<TResponseArticles[]>,
      { country?: string; category: string; pageSize?: number; page?: number }
    >({
      query: params => ({
        url: '/v2/top-headlines',
        method: 'GET',
        params
      })
    }),
    getEverithing: builder.query<
      TResponseApiSuccess<TResponseArticles[]>,
      { q?: string; from?: string; sortBy?: 'publishedAt'; pageSize?: number; page?: number }
    >({
      query: params => ({
        url: '/v2/everything',
        method: 'GET',
        params
      })
    })
  })
})

export const { useGetEverithingQuery, useGetTopHeadlinesQuery } = serviceApp
