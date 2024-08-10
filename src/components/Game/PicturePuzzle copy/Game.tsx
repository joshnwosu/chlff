import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Puzzle from './Puzzle';
import QuestionsPage from './Questions';
import Toast from './Toast';
import { RootState } from '../../../app/store';
import { revealPiece, selectRandomPiece, addTime, decrementTimer, resetGame } from '../../../features/puzzleSlice';
import questionsData from '../../../data/questions/questions.json'; // Import questions
import confetti from 'canvas-confetti'; // Import canvas-confetti

interface QuestionType {
  id: number;
  question: string;
  answer: string;
}

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.puzzle);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackPiece, setFeedbackPiece] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<string>('');
  const [questions] = useState<QuestionType[]>(questionsData); // Use questions from JSON
  const [score, setScore] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  // Timer effect
  useEffect(() => {
    if (state.timeLeft > 0 && !gameEnded) {
      const timer = setInterval(() => {
        dispatch(decrementTimer());
      }, 1000);
      return () => clearInterval(timer);
    } else if (!gameEnded) {
      handleGameEnd();
    }
  }, [dispatch, state.timeLeft, gameEnded]);

  const wonAudio = new Audio('./sound/point.wav');
  const lostAudio = new Audio('./sound/negative.wav');

  // Handle game end
  const handleGameEnd = () => {
    setGameEnded(true);
    setFeedbackMessage(`Game over! Your score: ${score}`);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // End game when timer reaches 0
  useEffect(() => {
    if (state.timeLeft <= 0) {
      alert('Time is up! Game over.');
    }
  }, [state.timeLeft]);

  const handleAnswerSubmit = (answer: string) => {
    if (state.timeLeft <= 0 || state.selectedPiece === null || gameEnded) return;

    const question = questions[state.selectedPiece];
    if (!question) return; // Check if question exists

    if (answer.toLowerCase() === question.answer.toLowerCase()) {
      dispatch(revealPiece());
      setScore((prevScore) => prevScore + 1);

      if (state.revealedPieces.length + 1 === questions.length) {
        // All questions have been answered
        handleGameEnd();
        return;
      }

      dispatch(selectRandomPiece());
      dispatch(addTime(3));
      setFeedbackMessage('Correct! 3 seconds added.');
      setFeedbackPiece(state.selectedPiece);
      setBorderColor('border-green-500');
      setShowPopup(true);
      wonAudio.play();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => setShowPopup(false), 1000);
    } else {
      setFeedbackMessage('Incorrect! Try again.');
      setFeedbackPiece(state.selectedPiece);
      setBorderColor('border-red-500');
      lostAudio.play();
    }

    setTimeout(() => {
      setFeedbackMessage(null);
      setFeedbackPiece(null);
      setBorderColor('');
    }, 1000);
  };

  // Restart the game
  const restartGame = () => {
    dispatch(resetGame()); // Reset game state in Redux
    setScore(0); // Reset score
    setGameEnded(false); // Set game status
    dispatch(selectRandomPiece()); // Ensure a question is selected
  };

  // Ensure `state.selectedPiece` is within bounds of `questions` array
  const currentQuestion = state.selectedPiece !== null ? questions[state.selectedPiece] : null;

  return (
    <main className="min-h-screen flex-col items-center justify-between p-24">
      <div className="md:flex justify-between items-center gap-4">
        <section className="flex-1">
          <Puzzle feedbackPiece={feedbackPiece} revealedPieces={state.revealedPieces} borderColor={borderColor} />
        </section>

        <section className="flex-1">
          {currentQuestion ? (
            <QuestionsPage question={currentQuestion} onAnswerSubmit={handleAnswerSubmit} />
          ) : (
            <p>No question selected</p>
          )}
        </section>
      </div>

      {feedbackMessage && <Toast message={feedbackMessage} onClose={() => setFeedbackMessage(null)} />}

      {showPopup && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-4 rounded shadow-lg">
          +3 seconds!
        </div>
      )}

      {/* Countdown Timer Display */}
      <div className="absolute top-0 right-0 m-4 p-2 bg-black text-white rounded">
        Time Left: {state.timeLeft} seconds
      </div>

      {/* Display Score and Restart Button */}
      {gameEnded && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-800 text-white text-center">
          <p className="text-xl font-bold">Final Score: {score}</p>
          <button onClick={restartGame} className="mt-4 bg-blue-500 text-white p-2 rounded">
            Restart Game
          </button>
        </div>
      )}
    </main>
  );
};

export default Game;
