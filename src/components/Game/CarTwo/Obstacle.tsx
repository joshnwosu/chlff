import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import styles from './Obstacle.module.css';

interface ObstacleProps {
  top: string;
  left: string;
  value: number;
}

const Obstacle: React.FC<ObstacleProps> = ({ top, left, value }) => {
  const props = useSpring({ top, left });

  return (
    <animated.div className={styles.obstacle} style={props}>
      {value}
    </animated.div>
  );
};

export default Obstacle;
