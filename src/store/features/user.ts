import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '小明',
    age: 22
  },
  reducers: {
    addAge(state, {payload}: PayloadAction<number>) {
      state.age += payload
    },
    changeName(state, {payload}: PayloadAction<string>) {
      state.name = payload
    }
  }
})

export const {addAge, changeName} = userSlice.actions

export default userSlice.reducer