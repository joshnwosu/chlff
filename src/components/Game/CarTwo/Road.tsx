import React from 'react';
import styles from './Road.module.css';

const Road: React.FC = () => {
  return (
    <div className={styles.road}>
    <div className={styles.roadLine}></div>
    <div className={styles.roadLine}></div>
    <div className={styles.roadLine}></div>
  </div>
  );
};

export default Road;
