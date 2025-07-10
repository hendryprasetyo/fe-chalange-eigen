import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
// Define the AppState type
export type AppState = {
  loadingGlobal: boolean
}

// Initial state for the app slice
const initialState: AppState = {
  loadingGlobal: false
}
export const storedKey = ['loadingGlobal']
// Redux slice definition
const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setLoadingGlobal: (state, action: PayloadAction<boolean>) => {
      state.loadingGlobal = action.payload
    }
  }
})

export const { setLoadingGlobal } = appSlice.actions

export default appSlice.reducer
