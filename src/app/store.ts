import { configureStore } from '@reduxjs/toolkit';
import constrolReducer from '../features/control/controlSlice';

export const store = configureStore({
  reducer: {
    control: constrolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
