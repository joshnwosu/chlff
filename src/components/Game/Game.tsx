import React, { useState, useEffect } from 'react';
import './Game.css';

export default function Game() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('up');
          break;
        case 'ArrowDown':
          setDirection('down');
          break;
        case 'ArrowLeft':
          setDirection('left');
          break;
        case 'ArrowRight':
          setDirection('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      moveCar();
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const moveCar = () => {
    switch (direction) {
      case 'up':
        setPosition((prevPos) => ({ ...prevPos, y: prevPos.y - 1 }));
        break;
      case 'down':
        setPosition((prevPos) => ({ ...prevPos, y: prevPos.y + 1 }));
        break;
      case 'left':
        setPosition((prevPos) => ({ ...prevPos, x: prevPos.x - 1 }));
        break;
      case 'right':
        setPosition((prevPos) => ({ ...prevPos, x: prevPos.x + 1 }));
        break;
      default:
        break;
    }
  };
  return (
    <div className='game-container'>
      <div className='car'></div>
    </div>
  );
}
