import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import { axiosServer } from '@/service/interceptor/axios'

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async ({ url, method = 'GET', data, params, headers }) => {
    try {
      const result = await axiosServer({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: { ...headers, 'X-Api-Key': import.meta.env.VITE_API_KEY! }
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError<any>

      const customErrorData = err.response?.data || {}

      return {
        error: {
          status: err.response?.status,
          ...customErrorData
        }
      }
    }
  }
