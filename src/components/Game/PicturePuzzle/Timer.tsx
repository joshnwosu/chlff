// src/components/Timer.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { decrementTimer } from '../../../features/puzzleSlice';

const Timer: React.FC = () => {
  const dispatch = useDispatch();
  const timeLeft = useSelector((state: RootState) => state.puzzle.timeLeft);

  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    return () => clearInterval(timerId);
  }, [dispatch]);

  return (
    <div className="timer">
      Time Left: {timeLeft} seconds
    </div>
  );
};

export default Timer;
