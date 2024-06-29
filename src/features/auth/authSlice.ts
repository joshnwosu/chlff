import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  isLoading: false,
  error: null,
};

export const constrolSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleAuth(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { toggleAuth } = constrolSlice.actions;
export default constrolSlice.reducer;
