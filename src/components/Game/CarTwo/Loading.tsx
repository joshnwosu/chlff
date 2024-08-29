// src/components/LoadingScreen.tsx
import React from 'react';
import styles from './Loading.module.css'

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <div className={styles.ldsCircle}><div></div></div>
    </div>
  );
};

export default LoadingScreen;
