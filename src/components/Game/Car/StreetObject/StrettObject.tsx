import React, { useEffect, useState } from 'react';
import styles from './StreetObject.module.css';
import { useAppSelector } from '../../../../app/hooks';

interface Position {
  x: number;
  y: number;
}

const StreetObject: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const { gameMode } = useAppSelector((state) => state.game);

  // Function to generate random positions for a group of street lamps
  const generateRandomPositions = (): Position[] => {
    const lampCount = Math.floor(Math.random() * 3) + 1; // Randomly choose between 1 and 3 lamps
    const randomPositions: Position[] = Array.from(
      { length: lampCount },
      () => {
        const randomY = Math.random() > 0.5 ? -35 : 90; // Randomly choose a y position (near the top or bottom)
        const randomX = 800 + Math.random() * 300; // Staggered start, random initial X position off the right side of the viewport
        return { x: randomX, y: randomY };
      }
    );
    return randomPositions;
  };

  useEffect(() => {
    // Initialize positions for the first group of street lamps
    setPositions(generateRandomPositions());

    const moveLamps = () => {
      setPositions((prevPositions) => {
        // Filter out lamps that have moved off-screen
        const newPositions = prevPositions
          .map((pos) => ({ ...pos, x: pos.x - 4 })) // Move each lamp left by 5px every frame
          .filter((pos) => pos.x > -100); // Keep only lamps that are still on-screen

        // If all lamps have moved off-screen, generate a new set of positions
        if (newPositions.length === 0) {
          return generateRandomPositions();
        }

        return newPositions;
      });
    };

    // console.log('mode: ', gameMode);

    const interval = setInterval(moveLamps, 5.2); // 5.2ms for ~60fps

    return () => clearInterval(interval);
  }, []);

  const backgroundImage =
    gameMode?.mode.name === 'Field'
      ? "url('assets/car/tree.png')"
      : gameMode?.mode.name === 'Snow'
      ? "url('assets/car/xmas_tree.png')"
      : gameMode?.mode.name === 'Desert'
      ? "url('assets/car/spike.png')"
      : "url('assets/car/tree.png')";

  return (
    <>
      {positions.map((position, index) => (
        <div
          key={index}
          className={styles['street-lamp']}
          style={{
            top: `${position.y}%`,
            left: `${position.x}px`,
            backgroundImage,
          }}
        />
      ))}
    </>
  );
};

export default StreetObject;
