import { configureStore } from '@reduxjs/toolkit'
import brightnessReducer from "./features/brightness/brightnessSlicer"
import socketReducer from "./features/socket/socketSlicer"

const store = configureStore({
  reducer: {
    brightness: brightnessReducer,
    socket: socketReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export default store;
