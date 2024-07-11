// src/components/QuestionsDisplay.tsx
import React from 'react';
import {
  unlockNextLevel,
  hideCongratulationScreen,
  selectGame,
} from '../../features/game/gameSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const QuestionsDisplay: React.FC = () => {
  const dispatch = useAppDispatch();
  const { additionQuestions, congratulationScreenVisible, selectedLevel } =
    useAppSelector((state) => selectGame(state));

  const handleLevelComplete = () => {
    dispatch(unlockNextLevel());
  };

  const handleCongratulationScreenClose = () => {
    dispatch(hideCongratulationScreen());
  };

  if (!selectedLevel) return null;

  return (
    <div>
      <h2>Level {selectedLevel}</h2>
      {additionQuestions.map((question) => (
        <div key={question.id}>
          <p>{question.question}</p>
          {/* Implement your answer input logic */}
        </div>
      ))}
      {congratulationScreenVisible && (
        <div>
          <p>Congratulations! Level {selectedLevel} completed!</p>
          <button onClick={handleLevelComplete}>
            Start Level {selectedLevel + 1}
          </button>
          <button onClick={handleCongratulationScreenClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default QuestionsDisplay;
