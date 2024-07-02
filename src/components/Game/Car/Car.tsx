import classes from './Car.module.css';
import PageWrapper from '../../Shared/PageWrapper/PageWrapper';
import LeaderBoard from '../../LeaderBoard/LeaderBoard';
import { useEffect, useRef, useState } from 'react';

export default function Car() {
  const [position, setPosition] = useState<string>('center');
  const [move, setMove] = useState(110);
  const movingDivRef = useRef<HTMLDivElement>(null);
  // @ts-ignore
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const movingDiv = movingDivRef.current;
      if (movingDiv) {
        const offsetLeft = movingDiv.offsetLeft;
        console.log('Offset Left:', offsetLeft);

        // Check if it's reached a certain left position
        if (offsetLeft <= 200) {
          // Do something when it reaches a certain left position
          setIsPaused(true);
          clearInterval(interval);
          console.log('Reached a certain left position!');
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowUp':
          setPosition('up');
          break;
        case 'ArrowDown':
          setPosition('down');
          break;
        default:
          // Ignore other key presses
          break;
      }
    }

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  useEffect(() => {
    if (position === 'up') {
      setMove(20);
    }

    if (position === 'down') {
      setMove(200);
    }
  }, [position]);

  function generateMultiplicationQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const question = `${num1} x ${num2}`;
    const answer = num1 * num2;
    return { question, answer };
  }

  return (
    <PageWrapper>
      <div className={classes.gameWrapper}>
        <div className={classes.title}>
          <h1>Multiplication</h1>
        </div>

        <div className={classes.gameCenter}>
          <div className={classes.gameCenterLeft}>
            <LeaderBoard />
          </div>
          <div className={classes.gameCenterMiddle}>
            <div className={classes.carContainer}>
              <div className={classes.road}>
                <div className={classes.car} style={{ top: `${move}px` }}></div>

                <div className={classes.lane}></div>
                <div className={classes.centerLine}></div>
                <div className={classes.lane}></div>
              </div>
            </div>
            <div className={classes.question}>
              <h1>{generateMultiplicationQuestion().question} = ?</h1>
            </div>
          </div>
          <div className={classes.gameCenterRight}></div>
        </div>
      </div>
    </PageWrapper>
  );
}
