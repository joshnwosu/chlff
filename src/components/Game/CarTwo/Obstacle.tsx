// src/components/Obstacle.tsx
import React, { useEffect, useState } from 'react';

interface ObstacleProps {
  startX: number; // Start position horizontally
  side: 'left' | 'right'; // Side of the road
  image: string; // Background image for the obstacle
}

const Obstacle: React.FC<ObstacleProps> = ({ startX, side, image }) => {
  const [position, setPosition] = useState({ top: -50, left: startX });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prevPosition => ({
        top: prevPosition.top + 5,
        left: side === 'left' ? prevPosition.left - 3 : prevPosition.left + 3,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [side]);

  return (
    <div
      className="w-20 h-20 absolute"
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
      }}
    />
  );
};

export default Obstacle;
