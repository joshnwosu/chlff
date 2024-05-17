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
      <div className="road">
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
        <div className="lane">
          <div
            ref={movingDivRef}
            className={`moving ${isPaused ? 'paused' : ''}`}
          >
            30x30
          </div>
        </div>
        <div className={`centerLine ${isPaused ? 'paused' : ''}`}></div>
        <div className="lane"></div>
      </div>
    </>
  );
}
