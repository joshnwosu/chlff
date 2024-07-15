// src/redux/soundSlice.js
import { createSlice } from '@reduxjs/toolkit';

const soundSlice = createSlice({
  name: 'sound',
  initialState: {
    isPlaying: true,
  },
  reducers: {
    toggleSound: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { toggleSound } = soundSlice.actions;
export default soundSlice.reducer;
