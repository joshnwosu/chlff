// src/components/LevelSelection.tsx
import React from 'react';
import { selectLevel, selectGame } from '../../features/game/gameSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const LevelSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedGrade, unlockedLevels } = useAppSelector((state) =>
    selectGame(state)
  );

  const handleLevelSelect = (level: number) => {
    dispatch(selectLevel(level));
  };

  if (!selectedGrade) return null;

  return (
    <div>
      <h2>Select Level</h2>
      {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
        <button
          key={level}
          onClick={() => handleLevelSelect(level)}
          disabled={!unlockedLevels.includes(level)}
        >
          Level {level}
        </button>
      ))}
    </div>
  );
};

export default LevelSelection;
