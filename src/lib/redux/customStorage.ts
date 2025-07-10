/* eslint-disable @typescript-eslint/no-unused-vars */
import type { WebStorage } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

const createNoopStorage = (): WebStorage => {
  return {
    getItem(_key: string): Promise<string | null> {
      return Promise.resolve(null)
    },
    setItem(_key: string, _value: string): Promise<void> {
      return Promise.resolve()
    },
    removeItem(_key: string): Promise<void> {
      return Promise.resolve()
    }
  }
}

const customStorage: WebStorage =
  typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

export default customStorage
