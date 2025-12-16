import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
// import { getPlayListApi, type PlayListItem } from "../../services"


interface PlayerState {
  playlist: PlayListItem[],
  curIndex: number,
  songUrl: string
}

const initialState: PlayerState = {
  playlist: [],
  curIndex: 0,
  songUrl: ''
}

export const getPlayList = createAsyncThunk('player/getPlayList', async() => {
  const res = await getPlayListApi()
  return res.data
})

// export const getSongUrl = createAsyncThunk('player/getSongUrl', async () => {

// })

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayList(state, {payload}: PayloadAction<PlayListItem[]>) {
      state.playlist = payload
    }
  },
  extraReducers: builder  => {
    builder
    .addCase(getPlayList.pending, (state, action) => {
      console.log('正在调用getPlayList接口', action)
    })
    .addCase(getPlayList.fulfilled, (state, {payload}) => {
      console.log('成功调用getPlayList接口', payload)
      state.playlist = payload.playlists
    })
    .addCase(getPlayList.rejected, (state, action) => {
      console.log('失败调用getPlayList接口', action)
    })
  },
})

export const {setPlayList} = playerSlice.actions

export default playerSlice.reducer