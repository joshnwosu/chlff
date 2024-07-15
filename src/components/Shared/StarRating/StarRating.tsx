import React from 'react';
import classes from './StarRating.module.css'; // Create this CSS file for styles

interface StarRatingProps {
  score: number;
}

const StarRating: React.FC<StarRatingProps> = ({ score }) => {
  const maxStars = 3;

  return (
    <div className={classes['star-rating']}>
      {Array.from({ length: maxStars }, (_, index) => (
        <span
          key={index}
          className={
            index < score ? `${classes.star} ${classes.filled}` : classes.star
          }
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
