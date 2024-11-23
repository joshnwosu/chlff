import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { getUserProfileService } from '../../services/userService';

type AppError = FirebaseError | Error;

interface UserState {
  user: {
    uid: string;
    displayName: string | null;
    email: string | null;
    role: string | null;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (_, thunkAPI) => {
    try {
      const userProfile = await getUserProfileService();
      if (!userProfile) {
        throw new Error('User profile not found');
      }
      return userProfile;
    } catch (error) {
      const typedError = error as AppError;
      return thunkAPI.rejectWithValue(typedError.message);
    }
  }
);

const soundSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default soundSlice.reducer;
