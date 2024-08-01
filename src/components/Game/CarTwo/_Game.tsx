import React, { useState, useEffect } from 'react';
import Car from './Car';
import Obstacle from './Obstacle';
import Road from './Road';
import styles from './Game.module.css';

interface ObstacleType {
  top: number;
  left: number;
  value: number;
}

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateQuestion = () => {
  const num1 = getRandomInt(1, 10);
  const num2 = getRandomInt(1, 10);
  const answer = num1 + num2;
  const incorrectAnswer = getRandomInt(1, 20);
  const options = Math.random() > 0.5 ? [answer, incorrectAnswer] : [incorrectAnswer, answer];
  return { question: `${num1} + ${num2}`, answer, options };
};

const Game: React.FC = () => {
  const [carPosition, setCarPosition] = useState<number>(50); 
  const [obstacles, setObstacles] = useState<ObstacleType[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [question, setQuestion] = useState<{ question: string; answer: number; options: number[] }>(generateQuestion());

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setCarPosition(25);
    } else if (e.key === 'ArrowRight') {
      setCarPosition(75);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setObstacles((prev) => prev.map((obs) => ({ ...obs, top: obs.top + 5 })));
      setObstacles((prev) => prev.filter((obs) => obs.top < 100));

      if (Math.random() < 0.1 && obstacles.length < 1) {
        setObstacles([
          { top: 0, left: 25, value: question.options[0] },
          { top: 0, left: 75, value: question.options[1] },
        ]);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [question, obstacles.length]);

  useEffect(() => {
    const handleCollision = () => {
      for (const obs of obstacles) {
        if (Math.abs(obs.top - 90) < 5 && Math.abs(obs.left - carPosition) < 5) {
          if (obs.value === question.answer) {
            setQuestion(generateQuestion());
            setObstacles([]);
          } else {
            setGameOver(true);
          }
          break;
        }
      }
    };

    handleCollision();
  }, [obstacles, carPosition, question]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (gameOver) {
    return <div className={styles.f_gameOver}>Game Over!</div>;
  }

  return (
    <div className={styles.f_container}>
    <div className={styles.f_game}>
      <div className={styles.f_question}>{question.question}</div>
      <Road />
      <Car position={`${carPosition}%`} />
      {obstacles.map((obs, index) => (
        <Obstacle key={index} top={`${obs.top}%`} left={`${obs.left}%`} value={obs.value} />
      ))}
    </div>
    </div>
  );
};

export default Game;
