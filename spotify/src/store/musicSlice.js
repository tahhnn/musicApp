import { createSlice } from "@reduxjs/toolkit";
import { songList } from "../data";

const initialState = {
  currentSong: 0,
  listSong: songList,
  isPlaying: false,
};
export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    playMusic: (state, action) => {
      state.isPlaying = action.payload;
    },
    getSong: (state, action) => {
      state.currentSong = action.payload;
    },
  },
});
export const { playMusic, getSong } = musicSlice.actions;
export default musicSlice.reducer;
