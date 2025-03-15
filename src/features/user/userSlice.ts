import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import {
  getUserProfileService,
  updateUserProfileService,
  UserProfile,
} from '../../services/userService';

type AppError = FirebaseError | Error;

interface UserState {
  user: UserProfile | null;
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
      // console.log('The User Profile: ', userProfile);
      return userProfile;
    } catch (error) {
      const typedError = error as AppError;
      return thunkAPI.rejectWithValue(typedError.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (
    { uid, updatedData }: { uid: string; updatedData: Partial<UserProfile> },
    thunkAPI
  ) => {
    try {
      await updateUserProfileService(uid, updatedData);
      const updatedProfile = await getUserProfileService(); // Fetch updated profile
      if (!updatedProfile) {
        throw new Error('Updated user profile not found');
      }
      return updatedProfile;
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
      })

      // updateUserProfile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default soundSlice.reducer;
