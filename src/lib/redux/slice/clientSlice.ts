import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type ClientState = {
  isLogin: boolean
}

// Initial state for the app slice
const initialState: ClientState = {
  isLogin: true
}
export const storedKey = ['isLogin']
// Redux slice definition
const clientSlice = createSlice({
  name: 'clientSlice',
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload
    }
  }
})

export const { setIsLogin } = clientSlice.actions

export default clientSlice.reducer
