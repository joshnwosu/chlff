import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store'; // Adjust the import based on your project structure
import { GameMode, GameOptions, Question } from '../../interfaces/data';


interface GameState {
  selectedGrade: number | null;
  selectedLevel: number | null;
  unlockedLevels: number[];
  additionQuestions: Question[];
  congratulationScreenVisible: boolean;
  gameMode: GameMode | null;
  selectedGame: GameOptions | null;
  selectedGameLevel: number | null;
  gameOptions: GameOptions[];
}

const initialGameState: GameState = {
  selectedGrade: null,
  selectedLevel: null,
  unlockedLevels: [1],
  additionQuestions: [],
  congratulationScreenVisible: false,
  gameMode: null,
  selectedGame: null,
  selectedGameLevel: null,
  gameOptions: [
    {
      name: 'ADDITION',
      color: 'rgba(198, 81, 149, 0.9)',
      img: '/assets/phonics_image1.jpeg',
      link: 'addition',
      levels: [{ status: 'unlocked', star: 0 }, ...Array(4).fill({ status: 'locked', star: 0 })],
      currentLevel: 0,
    },
    {
      name: 'SUBTRACTION',
      color: 'rgba(17, 169, 182, 0.9)',
      img: '/assets/punctuation_image_for_children1.jpeg',
      link: 'subtraction',
      levels: [{ status: 'unlocked', star: 0 }, ...Array(4).fill({ status: 'locked', star: 0 })],
      currentLevel: 0,
    },
    {
      name: 'MULTIPLICATION',
      color: 'rgba(70, 107, 163, 0.9)',
      img: '/assets/car_race1.jpeg',
      link: 'times-table',
      levels: [{ status: 'unlocked', star: 0 }, ...Array(4).fill({ status: 'locked', star: 0 })],
      currentLevel: 0,
    },
    {
      name: 'DIVISION',
      color: 'rgba(245, 178, 22, 0.9)',
      img: '/assets/spelling_image1.jpeg',
      link: 'division',
      levels: [{ status: 'unlocked', star: 0 }, ...Array(4).fill({ status: 'locked', star: 0 })],
      currentLevel: 0,
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
    unlockNextLevel(state) {
      if (state.selectedGame && state.selectedGameLevel !== null) {
        const nextLevel = state.selectedGameLevel + 1;
        if (nextLevel < state.selectedGame.levels.length) {
          state.selectedGame.levels[nextLevel].status = 'unlocked';
          state.selectedGame.currentLevel = nextLevel;
          state.selectedGameLevel = nextLevel;
          state.congratulationScreenVisible = true;
          state.additionQuestions = generateQuestions(
            state.selectedGrade!,
            nextLevel
          );
        }
      }
    },
    hideCongratulationScreen(state) {
      state.congratulationScreenVisible = false;
    },
    setGameMode(state, action: PayloadAction<GameMode>) {
      state.gameMode = action.payload;
    },
    setSelectedGame(state, action: PayloadAction<GameOptions>) {
      state.selectedGame = action.payload;
      state.selectedGameLevel = action.payload.currentLevel;
    },
    updateGameLevel(state, action: PayloadAction<{ gameName: string; level: number; star: number }>) {
      const { gameName, level, star } = action.payload;
      const game = state.gameOptions.find(game => game.name === gameName);
      if (game && level < game.levels.length) {
        game.levels[level].star = star;
        if (game.levels[level].status === 'locked') {
          game.levels[level].status = 'unlocked';
        }
      }
    },
  },
});

export const {
  selectGrade,
  selectLevel,
  unlockNextLevel,
  hideCongratulationScreen,
  setGameMode,
  setSelectedGame,
  updateGameLevel,
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
