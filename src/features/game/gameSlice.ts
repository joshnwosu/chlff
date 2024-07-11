import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store'; // Adjust the import based on your project structure

interface Question {
  id: number;
  question: string;
  answer: number;
}

interface GameState {
  selectedGrade: number | null;
  selectedLevel: number | null;
  unlockedLevels: number[];
  additionQuestions: Question[];
  congratulationScreenVisible: boolean;
}

const initialGameState: GameState = {
  selectedGrade: null,
  selectedLevel: null,
  unlockedLevels: [1],
  additionQuestions: [],
  congratulationScreenVisible: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    selectGrade(state, action: PayloadAction<number>) {
      state.selectedGrade = action.payload;
      state.selectedLevel = null; // Reset level selection
      state.unlockedLevels = [1];
      state.additionQuestions = []; // Clear previous questions
    },
    selectLevel(state, action: PayloadAction<number>) {
      state.selectedLevel = action.payload;
      state.additionQuestions = generateQuestions(
        state.selectedGrade!,
        action.payload
      );
    },
    unlockNextLevel(state) {
      if (state.selectedLevel) {
        const nextLevel = state.selectedLevel + 1;
        state.unlockedLevels.push(nextLevel);
        state.selectedLevel = nextLevel;
        state.congratulationScreenVisible = true;
        state.additionQuestions = generateQuestions(
          state.selectedGrade!,
          nextLevel
        );
      }
    },
    hideCongratulationScreen(state) {
      state.congratulationScreenVisible = false;
    },
  },
});

export const {
  selectGrade,
  selectLevel,
  unlockNextLevel,
  hideCongratulationScreen,
} = gameSlice.actions;

export default gameSlice.reducer;

// Helper function to generate addition questions
function generateQuestions(grade: number, level: number): Question[] {
  const numQuestions = 10;
  const maxNumber = grade * 10 + level * 2; // Adjust difficulty based on grade and level

  return Array.from({ length: numQuestions }, (_, index) => {
    const num1 = Math.floor(Math.random() * maxNumber);
    const num2 = Math.floor(Math.random() * maxNumber);
    return {
      id: index + 1,
      question: `${num1} + ${num2}`,
      answer: num1 + num2,
    };
  });
}

// Selector to access game state in components
export const selectGame = (state: RootState) => state.game;
