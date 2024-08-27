import React from 'react';
import styles from './TheSky.module.css'

interface TheSkyProps {
  skyImage: string;
}

const TheSky: React.FC<TheSkyProps> = ({ skyImage }) => {
  return (
    <div className="sky-container">
      <img src={skyImage} alt="Sky" className={styles.cloudImage} />
    </div>
  );
};

export default TheSky;
