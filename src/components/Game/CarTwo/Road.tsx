import React from 'react';
import styles from './Road.module.css';

const Road: React.FC = () => {
  return (
    <div className={styles.road}>
      <div className={styles.centerLine}></div>
      <div className={styles.centerLine} style={{ top: '20%' }}></div>
      <div className={styles.centerLine} style={{ top: '40%' }}></div>
      <div className={styles.centerLine} style={{ top: '60%' }}></div>
      <div className={styles.centerLine} style={{ top: '80%' }}></div>
    </div>
  );
};

export default Road;
