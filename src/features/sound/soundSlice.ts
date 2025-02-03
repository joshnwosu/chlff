// features/sound/soundSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SoundState {
  isSoundEnabled: boolean;
  volume: number;
  currentGameSounds: Record<string, HTMLAudioElement>;
}

const initialState: SoundState = {
  isSoundEnabled: true,
  volume: 0.5,
  currentGameSounds: {},
};

const soundSlice = createSlice({
  name: 'sound',
  initialState,
  reducers: {
    toggleSound: (state) => {
      state.isSoundEnabled = !state.isSoundEnabled;
      Object.values(state.currentGameSounds).forEach((sound) => {
        sound.muted = !state.isSoundEnabled;
      });
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = Math.min(Math.max(action.payload, 0), 1);
      Object.values(state.currentGameSounds).forEach((sound) => {
        sound.volume = state.volume;
      });
    },
    registerGameSounds: (
      state,
      action: PayloadAction<Record<string, HTMLAudioElement>>
    ) => {
      // state.currentGameSounds = {
      //   ...state.currentGameSounds,
      //   ...action.payload,
      // };
      state.currentGameSounds = Object.assign(
        {},
        state.currentGameSounds,
        action.payload
      );
    },
    unregisterGameSounds: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((soundName) => {
        delete state.currentGameSounds[soundName];
      });
    },
    stopAllSounds: (state) => {
      // Properly stop all sounds and clear them
      Object.values(state.currentGameSounds).forEach((sound) => {
        sound.pause();
        sound.currentTime = 0;
      });
      state.currentGameSounds = {};
    },
  },
});

export const {
  toggleSound,
  setVolume,
  registerGameSounds,
  unregisterGameSounds,
  stopAllSounds,
} = soundSlice.actions;
export default soundSlice.reducer;
