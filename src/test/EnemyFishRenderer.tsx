import { useState, useEffect } from 'react';
import './fish.css';

interface EnemyFish {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  directionHorizontal: 'left' | 'right';
  directionVertical: 'up' | 'down';
  speed: number;
}

const FISH_SIZE = 50; // Default fish size
const FISH_SPEED = 2; // Default fish speed

const EnemyFishRenderer = () => {
  const [fishEnemiesList, setFishEnemiesList] = useState<EnemyFish[]>([]);
  const [foodTimer, setFoodTimer] = useState(0);
  const [level] = useState(1);
  const fishEntryPositions = [50, 100, 150, 200, 250]; // Example positions

  // Create new enemy fish at random intervals and positions
  const createEnemyFishes = () => {
    setFoodTimer((prev) => prev + 1);

    if (foodTimer > 100 / (level * 0.9) && fishEnemiesList.length <= 9) {
      const rand = Math.floor(Math.random() * fishEntryPositions.length);

      const newFish: EnemyFish = {
        id: Date.now(), // Unique identifier
        x: 0,
        y: fishEntryPositions[rand],
        width: FISH_SIZE,
        height: FISH_SIZE,
        directionHorizontal: 'right',
        directionVertical: Math.random() > 0.5 ? 'up' : 'down',
        speed: FISH_SPEED,
      };

      setFishEnemiesList((prevList) => [...prevList, newFish]);
      setFoodTimer(0);
    }
  };

  // Move the enemy fish across the screen and remove them if they go off-screen
  const moveEnemyFishes = () => {
    setFishEnemiesList(
      (prevList) =>
        prevList
          .map((fish) => {
            // Update fish position
            const newX =
              fish.x +
              fish.speed * (fish.directionHorizontal === 'right' ? 1 : -1);
            const newY = fish.y + (fish.directionVertical === 'down' ? 1 : -1);

            // Change direction if the fish hits the vertical bounds
            if (newY <= 0) {
              fish.directionVertical = 'down';
            }
            if (newY + fish.height >= window.innerHeight) {
              fish.directionVertical = 'up';
            }

            return { ...fish, x: newX, y: newY };
          })
          .filter(
            (fish) =>
              fish.x + fish.width > 0 &&
              fish.x < window.innerWidth &&
              fish.y + fish.height > 0
          ) // Remove fish that go off-screen
    );
  };

  useEffect(() => {
    const createInterval = setInterval(createEnemyFishes, 1000); // Interval to create enemy fishes
    const moveInterval = setInterval(moveEnemyFishes, 50); // Interval to move enemy fishes

    return () => {
      clearInterval(createInterval);
      clearInterval(moveInterval);
    };
  }, [foodTimer, fishEnemiesList, level]);

  return (
    <div className='game-area'>
      {fishEnemiesList.map((fish) => (
        <div
          key={fish.id}
          className='enemy-fish'
          style={{
            left: fish.x,
            top: fish.y,
            width: fish.width,
            height: fish.height,
            position: 'absolute',
          }}
        ></div>
      ))}
    </div>
  );
};

export default EnemyFishRenderer;
