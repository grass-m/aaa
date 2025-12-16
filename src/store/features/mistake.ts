import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const misSlice = createSlice({
  name: 'mistake',
  initialState: {
    list: []
  },
  reducers: {
    getData(state, {payload}: PayloadAction<number>) {

    }
  }
})

export const {getData} = misSlice.actions

export default misSlice.reducer