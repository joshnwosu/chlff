import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { User } from 'firebase/auth';
import {
  loginUserService,
  registerUserService,
  updateUserProfileService,
} from '../../services/authService';
import { FirebaseError } from 'firebase/app';
import { UserProfile } from '../../services/userService';

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
      const typedError = error as AppError;
      return thunkAPI.rejectWithValue(typedError.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    { identifier, password }: { identifier: string; password: string },
    thunkAPI
  ) => {
    try {
      const { user, role } = await loginUserService(identifier, password);
      return {
        user: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        },
        role,
      };
    } catch (error) {
      const typedError = error as AppError;
      return thunkAPI.rejectWithValue(typedError.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (
    { uid, updatedData }: { uid: string; updatedData: Partial<UserProfile> },
    thunkAPI
  ) => {
    try {
      await updateUserProfileService(uid, updatedData);
      return updatedData;
    } catch (error) {
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
      state.isAuthenticated = false;
      localStorage.removeItem('authUser');
    },
    setUser(state, action) {
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    getUserFromStorage(state) {
      const authUser = localStorage.getItem('authUser') || null;
      if (authUser) {
        const { user, role } = JSON.parse(authUser);
        state.isAuthenticated = true;
        state.user = user;
        state.role = role;
      } else {
        state.isAuthenticated = false;
        state.user = null;
        state.role = null;
      }
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
        // Save to local storage
        localStorage.setItem(
          'authUser',
          JSON.stringify({
            user: action.payload.user,
            role: action.payload.role,
          })
        );
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
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.loading = false;
        state.isAuthenticated = true;
        // Save to local storage
        localStorage.setItem(
          'authUser',
          JSON.stringify({
            user: action.payload.user,
            role: action.payload.role,
          })
        );
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
          state.user = { ...state.user, ...action.payload }; // Merge updated data
        }
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleAuth, logout, setUser, getUserFromStorage } =
  authSlice.actions;
export default authSlice.reducer;
