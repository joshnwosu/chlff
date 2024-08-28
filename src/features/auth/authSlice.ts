import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { User } from 'firebase/auth';
import {
  loginUserService,
  registerUserService,
  updateUserProfileService,
} from '../../services/authService';
import { FirebaseError } from 'firebase/app';

// Define a more specific type for errors
type AppError = FirebaseError | Error;

interface AuthState {
  user: {
    uid: string;
    displayName: string | null;
    email: string | null;
  } | null;
  role: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    {
      email,
      password,
      displayName,
      role,
    }: { email: string; password: string; displayName: string; role: string },
    thunkAPI
  ) => {
    try {
      const user = await registerUserService(
        email,
        password,
        displayName,
        role
      );
      return {
        user: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        },
        role,
      };
    } catch (error) {
      // console.log('Error msg: ', error);
      // return thunkAPI.rejectWithValue(error.message);
      const typedError = error as AppError;
      return thunkAPI.rejectWithValue(typedError.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const user = await loginUserService(email, password);
      return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      };
    } catch (error) {
      // return thunkAPI.rejectWithValue(error.message);
      const typedError = error as AppError;
      return thunkAPI.rejectWithValue(typedError.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (displayName: string, thunkAPI) => {
    try {
      await updateUserProfileService(displayName);
      return displayName;
    } catch (error) {
      // return thunkAPI.rejectWithValue(error);
      const typedError = error as AppError;
      return thunkAPI.rejectWithValue(typedError.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleAuth(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    logout(state) {
      state.user = null;
      state.role = null;
    },
    setUser(state, action) {
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user.displayName = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleAuth, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
