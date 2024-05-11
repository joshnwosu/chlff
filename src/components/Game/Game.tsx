import React, { useState, useEffect } from 'react';
import './Game.css';

export default function Game() {
  const [position, setPosition] = useState({ y: 0 });
  // const [direction, setDirection] = useState('right');

  // useEffect(() => {
  //   const handleKeyPress = (e: any) => {
  //     switch (e.key) {
  //       case 'ArrowUp':
  //         setDirection('up');
  //         break;
  //       case 'ArrowDown':
  //         setDirection('down');
  //         break;
  //       case 'ArrowLeft':
  //         setDirection('left');
  //         break;
  //       case 'ArrowRight':
  //         setDirection('right');
  //         break;
  //       default:
  //         break;
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyPress);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     moveCar();
  //   }, 100);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // const moveCar = () => {
  //   switch (direction) {
  //     case 'up':
  //       setPosition((prevPos) => ({ ...prevPos, y: prevPos.y - 1 }));
  //       break;
  //     case 'down':
  //       setPosition((prevPos) => ({ ...prevPos, y: prevPos.y + 1 }));
  //       break;
  //     case 'left':
  //       setPosition((prevPos) => ({ ...prevPos, x: prevPos.x - 1 }));
  //       break;
  //     case 'right':
  //       setPosition((prevPos) => ({ ...prevPos, x: prevPos.x + 1 }));
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const parentHeight = 200; // Height of the parent container
      const childHeight = 50; // Height of the child div

      switch (e.key) {
        case 'ArrowUp':
          setPosition((prevPosition) => ({
            ...prevPosition,
            y: Math.max(0, prevPosition.y - 200),
          }));
          break;
        case 'ArrowDown':
          setPosition((prevPosition) => ({
            ...prevPosition,
            y: Math.min(parentHeight - childHeight, prevPosition.y + 200),
          }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Run effect only once on mount
  return (
    <>
      <div className='game-container'>
        <div
          className='car'
          style={{
            position: 'absolute',
            top: position.y,
            left: '50px',
            width: '100px',
            height: '50px',
            backgroundColor: 'blue',
            transition: 'top 0.2s ease-in-out',
          }}
        ></div>
      </div>

      <div className='road'>
        <div className='lane'></div>
        <div className='centerLine'></div>
        <div className='lane'></div>
      </div>
    </>
  );
}
