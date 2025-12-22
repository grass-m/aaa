import { configureStore } from '@reduxjs/toolkit'
import history from './features/history'

const store = configureStore({
  reducer: {
    history
  }
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch

export default store