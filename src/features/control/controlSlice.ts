import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ControlState {
  startGame: boolean;
  showCongratulationModal: boolean;
  assessmentYearModal: boolean;
  selectLevelModal: boolean;
}

const initialState: ControlState = {
  startGame: false,
  showCongratulationModal: false,
  assessmentYearModal: false,
  selectLevelModal: false,
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
    toggleSelectLevelModal(state, action: PayloadAction<boolean>) {
      state.selectLevelModal = action.payload;
    },
  },
});

export const {
  toggleStartGame,
  toggleShowCongratulationModal,
  toggleAssessmentYearModal,
  toggleSelectLevelModal,
} = constrolSlice.actions;
export default constrolSlice.reducer;
