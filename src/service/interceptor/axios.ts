import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import Axios, { AxiosError } from 'axios'

const buildDefaultHeaders = () => {
  return {
    'Content-Type': 'application/json; charset=UTF-8'
  }
}

// Raw axios tanpa interceptor
export const rawAxios = Axios.create({
  timeout: 10000,
  headers: buildDefaultHeaders()
})

// axiosServer (sama dengan raw, tapi bisa ditambahkan interceptor jika perlu)
export const axiosServer = Axios.create({
  ...rawAxios.defaults
})

// Optional: Interceptor untuk offline handling
axiosServer.interceptors.request.use(
  async (requestConfig: InternalAxiosRequestConfig) => {
    if (!navigator.onLine) {
      return Promise.reject(new AxiosError('You are currently offline.', 'ERR_OFFLINE'))
    }
    return requestConfig
  },
  (error: AxiosError) => Promise.reject(error)
)

axiosServer.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error)
)
