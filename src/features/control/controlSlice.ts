import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Score {
  total_questions: number;
  failed_questions: number;
  correct_questions: number;
}

interface ControlState {
  startGame: boolean;
  showCongratulationModal: boolean;
  assessmentYearModal: boolean;
  selectLevelModal: boolean;
  selectedYear: number;
  playerScore: Score;
  gameModeModal: boolean;
  gameSelectModal: boolean;
}

const initialState: ControlState = {
  startGame: false,
  showCongratulationModal: false,
  assessmentYearModal: false,
  selectLevelModal: false,
  selectedYear: 1,
  playerScore: {
    total_questions: 0,
    failed_questions: 0,
    correct_questions: 0,
  },
  gameModeModal: false,
  gameSelectModal: false,
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
    setSelectedYear(state, action: PayloadAction<number>) {
      state.selectedYear = action.payload;
    },
    setPlayerScore(state, action: PayloadAction<Score>) {
      state.playerScore = action.payload;
    },
    toggleGameModeModal(state, action: PayloadAction<boolean>) {
      state.gameModeModal = action.payload;
    },
    toggleGameSelectModal(state, action: PayloadAction<boolean>) {
      state.gameSelectModal = action.payload;
    },
  },
});

export const {
  toggleStartGame,
  toggleShowCongratulationModal,
  toggleAssessmentYearModal,
  toggleSelectLevelModal,
  setSelectedYear,
  setPlayerScore,
  toggleGameModeModal,
  toggleGameSelectModal,
} = constrolSlice.actions;
export default constrolSlice.reducer;
