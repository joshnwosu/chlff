import React from 'react';
import classes from './Level.module.css';

// Function to generate structured positions for levels
const generateStructuredPositions = (levelCount: number, spacing: number) => {
  const positions = [];
  for (let i = 0; i < levelCount; i++) {
    const x = 100 + i * spacing; // Fixed horizontal spacing
    const y = 150 + Math.sin(i * 1.5) * 40; // More pronounced vertical variation for effect
    positions.push({ x, y });
  }
  return positions;
};

const CurvedLineLevels: React.FC = () => {
  const levelsCount = 20; // Total number of levels
  const levels = Array.from({ length: levelsCount }, (_, index) => index + 1); // Generate level numbers
  const spacing = 80; // Spacing between levels

  // Generate structured positions for the levels
  const positions = generateStructuredPositions(levelsCount, spacing);

  const svgWidth = positions[levelsCount - 1].x + 100;

  return (
    <div className={classes['scrollable-container']}>
      <svg viewBox={`0 0 ${svgWidth} 300`}>
        {/* Draw the snake-shaped lines */}
        {levels.slice(0, -1).map((_, index) => {
          const start = positions[index];
          const end = positions[index + 1];
          // Create a more pronounced snake-like effect
          const controlY =
            index % 2 === 0
              ? Math.min(start.y, end.y) - 70 // Control point above for even indices
              : Math.max(start.y, end.y) + 70; // Control point below for odd indices

          return (
            <path
              key={index}
              d={`M${start.x} ${start.y} Q${
                (start.x + end.x) / 2
              } ${controlY} ${end.x} ${end.y}`}
              stroke='rgba(255,255,255,0.4)'
              strokeWidth={5}
              fill='none'
            />
          );
        })}

        {/* Draw the level circles */}
        {positions.map((pos, index) => (
          <circle
            key={index}
            cx={pos.x}
            cy={pos.y}
            r={15}
            fill='gold'
            stroke='rgba(255,255,255,1)'
            strokeWidth={3}
            className={classes.circle}
          />
        ))}

        {/* Draw level numbers */}
        {positions.map((pos, index) => (
          <text
            key={index}
            x={pos.x}
            y={pos.y + 5}
            textAnchor='middle'
            className={classes['text-level']}
          >
            {levels[index]}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default CurvedLineLevels;
