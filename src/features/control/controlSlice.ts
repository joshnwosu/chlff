import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ControlState {
  startGame: boolean;
}

const initialState: ControlState = {
  startGame: false,
};

export const constrolSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    toggleStartGame(state, action: PayloadAction<boolean>) {
      state.startGame = action.payload;
    },
  },
});

export const { toggleStartGame } = constrolSlice.actions;
export default constrolSlice.reducer;
