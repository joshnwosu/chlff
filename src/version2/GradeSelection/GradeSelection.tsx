// src/components/GradeSelection.tsx
import React from 'react';
import { selectGrade } from '../../features/game/gameSlice';
import { useAppDispatch } from '../../app/hooks';
// import { selectGrade } from '../features/game/gameSlice';

const GradeSelection: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleGradeSelect = (grade: number) => {
    dispatch(selectGrade(grade));
  };

  return (
    <div>
      <button onClick={() => handleGradeSelect(1)}>Grade 1</button>
      <button onClick={() => handleGradeSelect(2)}>Grade 2</button>
      {/* Add buttons for other grades */}
    </div>
  );
};

export default GradeSelection;
