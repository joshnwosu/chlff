import { configureStore } from '@reduxjs/toolkit';
import constrolReducer from '../features/control/controlSlice';
import authReducer from '../features/auth/authSlice';
import gameReducer from '../features/game/gameSlice';
import soundReducer from '../features/sound/soundSlice';
import puzzleReducer from '../features/puzzleSlice';

export const store = configureStore({
  reducer: {
    control: constrolReducer,
    auth: authReducer,
    game: gameReducer,
    sound: soundReducer,
    puzzle: puzzleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
