import React from 'react';
import classes from './StarRating.module.css'; // Create this CSS file for styles

interface StarRatingProps {
  score: number;
  size?: 'small' | 'medium' | 'large';
}

const StarRating: React.FC<StarRatingProps> = ({ score, size = 'small' }) => {
  const maxStars = 3;

  return (
    <div className={classes['star-rating']}>
      {Array.from({ length: maxStars }, (_, index) => (
        <span
          key={index}
          className={
            index < score ? `${classes.star} ${classes.filled}` : classes.star
          }
          style={{
            fontSize: size === 'small' ? 20 : size === 'medium' ? 40 : 60,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
