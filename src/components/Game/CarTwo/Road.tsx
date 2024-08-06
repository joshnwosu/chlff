import React from 'react';
import styles from './Road.module.css';

const Road: React.FC = () => {
  return (
    <div className={styles.road}>
      <div className={styles.centerLineContainer}>
        <div className={styles.centerLine} style={{ width: '2px', left: '50%', transform: 'translateX(-50%)', top: '0%' }}></div>
        <div className={styles.centerLine} style={{ width: '4px', left: '50%', transform: 'translateX(-50%)', top: '20%' }}></div>
        <div className={styles.centerLine} style={{ width: '6px', left: '50%', transform: 'translateX(-50%)', top: '40%' }}></div>
        <div className={styles.centerLine} style={{ width: '8px', left: '50%', transform: 'translateX(-50%)', top: '60%' }}></div>
        <div className={styles.centerLine} style={{ width: '10px', left: '50%', transform: 'translateX(-50%)', top: '80%' }}></div>
      </div>
    </div>
  );
};

export default Road;
