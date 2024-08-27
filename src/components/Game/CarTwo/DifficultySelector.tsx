import React from 'react';

interface DifficultySelectorProps {
  difficulty: number;
  onDifficultyChange: (difficulty: number) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ difficulty, onDifficultyChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onDifficultyChange(Number(event.target.value));
  };

  return (
    <div>
      <label htmlFor="difficulty-select">Select Difficulty: </label>
      <select
        id="difficulty-select"
        value={difficulty}
        onChange={handleChange}
      >
        <option value={1}>Easy</option>
        <option value={2}>Medium</option>
        <option value={3}>Hard</option>
      </select>
    </div>
  );
};

export default DifficultySelector;
