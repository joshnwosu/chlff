import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import car from './car.png';
import styles from './Car.module.css';

interface CarProps {
  position: string;
  rotation: number;
}

const Car: React.FC<CarProps> = ({ position, rotation }) => {
  const props = useSpring({
    left: position, // Position from the left edge
    transform: `translateX(-50%) rotate(${rotation}deg)`, // Apply both translate and rotate
    transformOrigin: 'center', // Ensure rotation happens around the center
    config: { tension: 200, friction: 15 },
  });

  return (
    <animated.div className={styles.car} style={props}>
      <img src={car} alt="car" className={styles.carImage} />
    </animated.div>
  );
};

export default Car;
