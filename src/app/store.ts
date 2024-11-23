import { configureStore } from '@reduxjs/toolkit';
import controlReducer from '../features/control/controlSlice';
import authReducer from '../features/auth/authSlice';
import gameReducer from '../features/game/gameSlice';
import soundReducer from '../features/sound/soundSlice';
import puzzleReducer from '../features/puzzleSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    control: controlReducer,
    auth: authReducer,
    user: userReducer,
    game: gameReducer,
    sound: soundReducer,
    puzzle: puzzleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
