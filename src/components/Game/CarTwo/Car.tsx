import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import car from './car.png';
import styles from './Car.module.css';

interface CarProps {
  position: string;
}

const Car: React.FC<CarProps> = ({ position }) => {
  const props = useSpring({ left: position });

  return (
    <animated.div className={styles.car} style={props}>
      <img src={car} alt="car" className={styles.carImage} />
    </animated.div>
  );
};

export default Car;
