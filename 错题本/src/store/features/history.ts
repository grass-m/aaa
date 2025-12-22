import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type Question } from "../../services"


export interface historyInfo {
  list: Question[]
  id: number
  finishTime: number
  score: number
  errorCount: number
  correctCount: number
}

type State = { 
  historyRecord: historyInfo[]
}

const initialState: State = {
  historyRecord: []
}

export const hisSlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addData(state, {payload}: PayloadAction<historyInfo>) {
      state.historyRecord.unshift(payload)
    }
  }
})

export const {addData} = hisSlice.actions

export default hisSlice.reducer