import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getLeaderBoardService,
  LeaderBoardEntry,
  updateLeaderBoardService,
} from '../../services/leaderBoardService';

interface LeaderBoardState {
  leaderboard: LeaderBoardEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: LeaderBoardState = {
  leaderboard: [],
  loading: false,
  error: null,
};

// Async thunk to fetch leaderboard by year
export const getLeaderBoard = createAsyncThunk(
  'leaderboard/getLeaderBoard',
  async (year: number, thunkAPI) => {
    try {
      const leaderboard = await getLeaderBoardService(year);
      return leaderboard;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching leaderboard');
    }
  }
);

// Async thunk to update leaderboard for a specific user
export const updateLeaderBoard = createAsyncThunk(
  'leaderboard/updateLeaderBoard',
  async (
    {
      uid,
      updatedData,
    }: { uid: string; updatedData: Partial<LeaderBoardEntry> },
    thunkAPI
  ) => {
    try {
      await updateLeaderBoardService(uid, updatedData);
      return { uid, updatedData }; // Return for updating the state
    } catch (error) {
      return thunkAPI.rejectWithValue('Error updating leaderboard');
    }
  }
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeaderBoard.fulfilled, (state, action) => {
        state.leaderboard = action.payload;
        state.loading = false;
      })
      .addCase(getLeaderBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateLeaderBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLeaderBoard.fulfilled, (state, action) => {
        state.loading = false;
        // Update leaderboard with the updated data
        const { uid, updatedData } = action.payload;
        const index = state.leaderboard.findIndex((entry) => entry.uid === uid); // Use `uid` for matching
        if (index !== -1) {
          state.leaderboard[index] = {
            ...state.leaderboard[index],
            ...updatedData,
          };
        }
      })
      .addCase(updateLeaderBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default leaderboardSlice.reducer;
