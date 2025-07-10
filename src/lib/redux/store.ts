/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore, type Reducer } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import customStorage from './customStorage'
import { entryService } from '@/service'
import { setupListeners } from '@reduxjs/toolkit/query'
import { AppState } from './slice/appSlice'
import appSlice, { storedKey as storedKeyAppState } from './slice/appSlice'
import clientSlice, { ClientState, storedKey as storedKeyClientState } from './slice/clientSlice'

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: [] // global whitelist if you want to add any
}
type PersistedReducer = {
  reducer: Reducer<any, any>
  whitelist?: string[]
}

export const mapWithPersistor = (reducers: Record<string, PersistedReducer>) =>
  Object.entries(reducers)
    .map(([key, { reducer, whitelist }]) =>
      whitelist && whitelist.length > 0
        ? {
            [key]: persistReducer({ key, storage: customStorage, whitelist }, reducer)
          }
        : { [key]: reducer }
    )
    .reduce((obj, item) => ({ ...obj, ...item }), {})

const storedReducers = {
  app: { reducer: appSlice, whitelist: storedKeyAppState },
  client: { reducer: clientSlice, whitelist: storedKeyClientState }
}

const rootReducer = combineReducers({
  ...mapWithPersistor(storedReducers) // Add persisted reducers dynamically
})

const middleWares = [entryService.middleware]

export const store = configureStore({
  reducer: {
    [entryService.reducerPath]: entryService.reducer, // miaService reducer path
    root: rootReducer // Root reducer
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleWares) // Apply custom middleware
})

setupListeners(store.dispatch)
export type AppDispatch = typeof store.dispatch
export type RootState = {
  root: {
    app: AppState
    client: ClientState
  }
}
