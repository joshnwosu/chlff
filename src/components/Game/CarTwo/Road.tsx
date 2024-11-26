import React from 'react';
import styles from './Road.module.css';

interface RoadProps {
  speed: number; 
}

const Road: React.FC<RoadProps> = ({ speed }) => {
  const animationDuration = `${speed}s`; // Dynamic duration based on speed

  return (
    <div className={styles.road}>
      <div className={styles.roadLine} style={{ animationDuration }}></div>
      <div className={styles.roadLine} style={{ animationDuration }}></div>
      <div className={styles.roadLine} style={{ animationDuration }}></div>
    </div>
  );
};

export default Road;
