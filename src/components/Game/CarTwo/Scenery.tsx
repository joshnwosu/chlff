import React from 'react';
import styles from './Scenery.module.css';

interface SceneryProps {
  image: string;
  side: 'left' | 'right';
  speed: number;
  delay?: number;  
}

const Scenery: React.FC<SceneryProps> = ({ image, side, speed, delay = 0 }) => {
  return (
    <div
      className={`${styles.scenery} ${styles[side]}`}
      style={{ 
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s` // Apply the delay
      }}    >
      <img src={image} alt="Scenery" />
    </div>
  );
};

export default Scenery;
