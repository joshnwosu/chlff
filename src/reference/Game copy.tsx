// import { useState, useEffect } from 'react';
// import './Game.css';

// export default function Game() {
//   const [position, setPosition] = useState({ y: 0 });
//   // const [direction, setDirection] = useState('right');

//   // useEffect(() => {
//   //   const handleKeyPress = (e: any) => {
//   //     switch (e.key) {
//   //       case 'ArrowUp':
//   //         setDirection('up');
//   //         break;
//   //       case 'ArrowDown':
//   //         setDirection('down');
//   //         break;
//   //       case 'ArrowLeft':
//   //         setDirection('left');
//   //         break;
//   //       case 'ArrowRight':
//   //         setDirection('right');
//   //         break;
//   //       default:
//   //         break;
//   //     }
//   //   };

//   //   window.addEventListener('keydown', handleKeyPress);

//   //   return () => {
//   //     window.removeEventListener('keydown', handleKeyPress);
//   //   };
//   // }, []);

//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     moveCar();
//   //   }, 100);

//   //   return () => {
//   //     clearInterval(interval);
//   //   };
//   // }, []);

//   // const moveCar = () => {
//   //   switch (direction) {
//   //     case 'up':
//   //       setPosition((prevPos) => ({ ...prevPos, y: prevPos.y - 1 }));
//   //       break;
//   //     case 'down':
//   //       setPosition((prevPos) => ({ ...prevPos, y: prevPos.y + 1 }));
//   //       break;
//   //     case 'left':
//   //       setPosition((prevPos) => ({ ...prevPos, x: prevPos.x - 1 }));
//   //       break;
//   //     case 'right':
//   //       setPosition((prevPos) => ({ ...prevPos, x: prevPos.x + 1 }));
//   //       break;
//   //     default:
//   //       break;
//   //   }
//   // };

//   // const [position, setPosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       const parentHeight = 200; // Height of the parent container
//       const childHeight = 50; // Height of the child div

//       switch (e.key) {
//         case 'ArrowUp':
//           setPosition((prevPosition) => ({
//             ...prevPosition,
//             y: Math.max(0, prevPosition.y - 200),
//           }));
//           break;
//         case 'ArrowDown':
//           setPosition((prevPosition) => ({
//             ...prevPosition,
//             y: Math.min(parentHeight - childHeight, prevPosition.y + 200),
//           }));
//           break;
//         default:
//           break;
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []); // Run effect only once on mount

//   function generateMultiplicationQuestion() {
//     const num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
//     const num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
//     const question = `${num1} * ${num2}`; // Create the question string
//     const answer = num1 * num2; // Calculate the answer
//     return { question, answer }; // Return an object containing the question and answer
//   }

//   useEffect(() => {
//     // Example usage:
//     const { question, answer } = generateMultiplicationQuestion();
//     console.log('Question:', question); // Output the question
//     console.log('Answer:', answer); // Output the answer
//   }, []);

//   return (
//     <>
//       <div>
//         <h1>{generateMultiplicationQuestion().question} = ?</h1>
//       </div>

//       <div className='game-container'>
//         <div
//           className='car'
//           style={{
//             position: 'absolute',
//             top: position.y,
//             left: '50px',
//             width: '100px',
//             height: '50px',
//             backgroundColor: 'blue',
//             transition: 'top 0.2s ease-in-out',
//           }}
//         ></div>
//       </div>

//       <div className='road'>
//         <div className='lane'></div>
//         <div className='centerLine'></div>
//         <div className='lane'></div>
//       </div>
//     </>
//   );
// }

import { useEffect, useRef, useState } from 'react';
import './Game.css';

export default function Game() {
  const [position, setPosition] = useState<string>('center');
  const [move, setMove] = useState(165);
  const movingDivRef = useRef<HTMLDivElement>(null);
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
      setMove(50);
    }

    if (position === 'down') {
      setMove(275);
    }
  }, [position]);

  return (
    <>
      <div>
        <p>Position: {position}</p>
      </div>
      <div className='road'>
        <div
          style={{
            position: 'absolute',
            top: `${move}px`,
            left: '150px',
            transform: 'translateX(-50%)',
            width: '150px',
            height: '70px',
            backgroundColor: 'red',
            transition: 'all 500ms ease-in-out',
            zIndex: 9,
          }}
        ></div>
        <div className='lane'>
          <div
            ref={movingDivRef}
            className={`moving ${isPaused ? 'paused' : ''}`}
          >
            30x30
          </div>
        </div>
        <div className={`centerLine ${isPaused ? 'paused' : ''}`}></div>
        <div className='lane'></div>
      </div>
    </>
  );
}
