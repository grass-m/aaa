import { configureStore } from '@reduxjs/toolkit'
import user from './features/user'
import player from './features/player'

const store = configureStore({
  reducer: {
    user,
    player
  }
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch

export default store