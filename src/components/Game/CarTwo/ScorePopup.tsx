import React from 'react';
import styles from './ScorePopup.module.css'

interface ScorePopupProps {
    message: string;
    isVisible: boolean;
  }
const ScorePopup: React.FC<ScorePopupProps> = ({ message, isVisible }) => {
    return (
        isVisible && (
            <div className={styles.scorePopup}>
                {message}
            </div>
        )
    );
};

export default ScorePopup;
