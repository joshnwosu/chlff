import { configureStore } from '@reduxjs/toolkit';
import constrolReducer from '../features/control/controlSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    control: constrolReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
