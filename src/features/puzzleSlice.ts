import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  id: number;
  question: string;
  answer: string;
}

interface PuzzleState {
  selectedPiece: number | null;
  revealedPieces: number[];
  questions: Question[];
  timeLeft: number;
}

const initialState: PuzzleState = {
  selectedPiece: 0,
  revealedPieces: [],
  questions: [],
  timeLeft: 30,
};

const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState,
  reducers: {
    revealPiece(state) {
      if (state.selectedPiece !== null) {
        state.revealedPieces.push(state.selectedPiece);
      }
    },
    selectRandomPiece(state) {
      const unrevealedPieces = Array.from({ length: 30 }, (_, i) => i).filter(
        (i) => !state.revealedPieces.includes(i)
      );
      if (unrevealedPieces.length > 0) {
        state.selectedPiece = unrevealedPieces[Math.floor(Math.random() * unrevealedPieces.length)];
      } else {
        state.selectedPiece = null; // No more pieces to reveal
      }
    },
    addTime(state, action: PayloadAction<number>) {
      state.timeLeft += action.payload;
    },
    decrementTimer(state) {
      state.timeLeft -= 1;
    },
    resetGame(state) {
      state.selectedPiece = 0;
      state.revealedPieces = [];
      state.timeLeft = 30; // Reset to initial countdown timer value
      // You can also reset any other state variables if needed
    },
  },
});

export const { revealPiece, selectRandomPiece, addTime, decrementTimer, resetGame } = puzzleSlice.actions;
export default puzzleSlice.reducer;
