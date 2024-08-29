import React, { useEffect, useRef } from 'react';
import styles from './Scenery.module.css';

interface SceneryProps {
  image: string; // URL of the image to be used as the background
  side: 'left' | 'right'; // Determines which side of the road the scenery is on
  speed?: number; // Optional speed modifier (in seconds)
}

const Scenery: React.FC<SceneryProps> = ({ image, side, speed = 4 }) => {
  const sceneryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const delay = Math.random() * 5;
    const randomOffset = Math.random() * 10 - 5;

    if (sceneryRef.current) {
      sceneryRef.current.style.animationDelay = `${delay}s`;
      sceneryRef.current.style.animationDuration = `${speed}s`; // Set the animation speed
      if (side === 'left') {
        sceneryRef.current.style.transform = `translateX(${randomOffset}%)`;
      } else if (side === 'right') {
        sceneryRef.current.style.transform = `translateX(${randomOffset}%)`;
      }
    }
  }, [side, speed]);

  return (
    <div
      ref={sceneryRef}
      className={`${styles.scenery} ${side === 'left' ? styles.left : styles.right}`}
      style={{
        backgroundImage: `url(${image})`,
      }}
    ></div>
  );
};

export default Scenery;
