import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export const brightnessSlice = createSlice({
  name: 'brightness',
  initialState: {
    value: 50
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if(state.value + 10 <= 100) state.value += 10
    },
    decrement: (state) => {
      if(state.value - 10 >= 0) state.value -= 10
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

export const selectBrightness = (state: RootState) => state.brightness.value
// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = brightnessSlice.actions

export default brightnessSlice.reducer