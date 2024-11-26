import React from 'react';
import styles from './ScorePopup.module.css';

interface ScorePopupProps {
  message: string;
  isVisible: boolean;
  isWrong: boolean;
}

const ScorePopup: React.FC<ScorePopupProps> = ({ message, isVisible, isWrong }) => {
  if (!isVisible) return null;

  // Apply different classes based on whether the answer is wrong
  const popupClass = isWrong ? styles.animateNoPoint : styles.scorePopup;

  return (
    <div className={popupClass}>
      {message}
    </div>
  );
};

export default ScorePopup;
