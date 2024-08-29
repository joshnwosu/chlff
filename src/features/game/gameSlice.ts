import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store'; // Adjust the import based on your project structure
import {
  GameMode,
  GameOperator,
  Question,
  SelectedGame,
} from '../../interfaces/data';

interface GameState {
  selectedGrade: number | null;
  selectedLevel: number | null;
  unlockedLevels: number[];
  additionQuestions: Question[];
  congratulationScreenVisible: boolean;
  gameMode: GameMode | null;
  selectedGame: SelectedGame | null;
  selectedOperator: GameOperator | null;
  selectedGameLevel: number | null;
  gameOpeartors: GameOperator[];
}

const initialGameState: GameState = {
  selectedGrade: null,
  selectedLevel: null,
  unlockedLevels: [1],
  additionQuestions: [],
  congratulationScreenVisible: false,
  gameMode: null,
  selectedGame: null,
  selectedOperator: null,
  selectedGameLevel: null,
  gameOpeartors: [
    {
      name: 'ADDITION',
      color: 'rgba(198, 81, 149, 0.9)',
      img: '/assets/action-center/addition.jpg',
      link: 'addition',
    },
    {
      name: 'SUBTRACTION',
      color: 'rgba(17, 169, 182, 0.9)',
      img: '/assets/action-center/subtraction.jpg',
      link: 'subtraction',
    },
    {
      name: 'MULTIPLICATION',
      color: 'rgba(70, 107, 163, 0.9)',
      img: '/assets/action-center/multiplication.jpg',
      link: 'times-table',
    },
    {
      name: 'DIVISION',
      color: 'rgba(245, 178, 22, 0.9)',
      img: '/assets/action-center/division.jpg',
      link: 'division',
    },
  ],
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
    hideCongratulationScreen(state) {
      state.congratulationScreenVisible = false;
    },
    setGameMode(state, action: PayloadAction<GameMode>) {
      state.gameMode = action.payload;
    },
    setSelectedGame(state, action: PayloadAction<SelectedGame>) {
      state.selectedGame = action.payload;
    },
    setSelectedOperator(state, action: PayloadAction<GameOperator>) {
      state.selectedOperator = action.payload;
    },
  },
});

export const {
  selectGrade,
  selectLevel,
  hideCongratulationScreen,
  setGameMode,
  setSelectedGame,
  setSelectedOperator,
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
