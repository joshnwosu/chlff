import React, { useEffect, useState } from 'react';
import styles from './Car.module.css';
import { useAppSelector } from '../../../app/hooks';

interface Position {
  x: number;
  y: number;
}

const StreetLamp: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const { gameMode } = useAppSelector((state) => state.game);

  const generateRandomPositions = (): Position[] => {
    const lampCount = Math.floor(Math.random() * 3) + 1; // Randomly choose between 1 and 3 lamps
    const randomPositions: Position[] = Array.from(
      { length: lampCount },
      () => {
        const randomY = -80; // Start above the viewport
        const randomX = Math.random() * (window.innerWidth - 100); // Random X position within the viewport width
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
          .map((pos) => ({ ...pos, y: pos.y + 4 })) // Move each lamp down by 4px every frame
          .filter((pos) => pos.y < window.innerHeight); // Keep only lamps that are still on-screen
    
        // If all lamps have moved off-screen, generate a new set of positions
        if (newPositions.length === 0) {
          return generateRandomPositions();
        }
    
        return newPositions;
      });
    };
    

    // console.log('mode: ', gameMode);

    const interval = setInterval(moveLamps, 16); // 16ms for ~60fps

    return () => clearInterval(interval);
  }, []);

  const backgroundImage =
    gameMode?.mode.name === 'Field'
      ? "url('assets/car/tree.png')"
      : gameMode?.mode.name === 'Snow'
      ? "url('assets/car/xmas_tree.png')"
      : "url('assets/car/spike.png')";

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

export default StreetLamp;
