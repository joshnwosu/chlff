import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LeaderBoardEntry } from '../../services/leaderBoardService';

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
  selectGenderModal: boolean;
  showLeaderBoardInfoModal: boolean;
  showSoundSettingModal: boolean;
  selectedLeaderBoard: LeaderBoardEntry;
  noAvatarMoal: boolean;
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
  selectGenderModal: false,
  showLeaderBoardInfoModal: false,
  showSoundSettingModal: false,
  selectedLeaderBoard: {
    displayName: '',
    totalSuccessfulMissions: 0,
    totalTimePlayed: 0,
    year: 0,
    uid: '',
  },
  noAvatarMoal: false,
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
    toggleSelectGenderModal(state, action: PayloadAction<boolean>) {
      state.selectGenderModal = action.payload;
    },
    toggleShowLeadeBoardInfoModal(state, action: PayloadAction<boolean>) {
      state.showLeaderBoardInfoModal = action.payload;
    },
    toggleShowSoundSetting(state, action: PayloadAction<boolean>) {
      state.showSoundSettingModal = action.payload;
    },
    setSelectedLeaderBoard(state, action: PayloadAction<LeaderBoardEntry>) {
      state.selectedLeaderBoard = action.payload;
    },
    toggleShowNoAvatarModal(state, action: PayloadAction<boolean>) {
      state.noAvatarMoal = action.payload;
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
  toggleSelectGenderModal,
  toggleShowLeadeBoardInfoModal,
  toggleShowSoundSetting,
  setSelectedLeaderBoard,
  toggleShowNoAvatarModal,
} = constrolSlice.actions;
export default constrolSlice.reducer;
