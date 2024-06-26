import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ControlState {
  startGame: boolean;
  showCongratulationModal: boolean;
  assessmentYearModal: boolean;
}

const initialState: ControlState = {
  startGame: false,
  showCongratulationModal: false,
  assessmentYearModal: false,
};

export const constrolSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    toggleStartGame(state, action: PayloadAction<boolean>) {
      state.startGame = action.payload;
    },
    toggleShowCongratulationModal(state, action: PayloadAction<boolean>) {
      state.showCongratulationModal = action.payload;
    },
    toggleAssessmentYearModal(state, action: PayloadAction<boolean>) {
      state.assessmentYearModal = action.payload;
    },
  },
});

export const {
  toggleStartGame,
  toggleShowCongratulationModal,
  toggleAssessmentYearModal,
} = constrolSlice.actions;
export default constrolSlice.reducer;
