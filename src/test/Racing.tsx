import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

interface Player {
  speed: number;
  score: number;
  start: boolean;
  x: number;
  y: number;
}

interface Keys {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
}

const CarRacer: React.FC = () => {
  const [player, setPlayer] = useState<Player>({
    speed: 7,
    score: 0,
    start: false,
    x: 0,
    y: 0,
  });
  const [keys, setKeys] = useState<Keys>({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement | null>(null);
  const roadLinesRef = useRef<HTMLDivElement[]>([]);
  const enemyCarsRef = useRef<HTMLDivElement[]>([]);
  const scoreRef = useRef<HTMLDivElement>(null);
  //   const gameStartAudio = useRef(new Audio('assets/audio/game_theme.mp3'));
  //   const gameOverAudio = useRef(new Audio('assets/audio/gameOver_theme.mp3'));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prevKeys) => ({ ...prevKeys, [e.key]: true }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((prevKeys) => ({ ...prevKeys, [e.key]: false }));
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const randomColor = (): string => {
    const c = () => {
      const hex = Math.floor(Math.random() * 256).toString(16);
      return ('0' + String(hex)).substr(-2);
    };
    return '#' + c() + c() + c();
  };

  const onCollision = (a: HTMLElement, b: HTMLElement): boolean => {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return !(
      aRect.top > bRect.bottom ||
      aRect.bottom < bRect.top ||
      aRect.right < bRect.left ||
      aRect.left > bRect.right
    );
  };

  const onGameOver = () => {
    setPlayer((prevPlayer) => ({ ...prevPlayer, start: false }));
    // gameStartAudio.current.pause();
    // gameOverAudio.current.play();
    setTimeout(() => {
      //   alert(
      //     `Game Over\nYour final score is ${player.score}\nPress OK to restart the game.`
      //   );
      window.location.reload(); // to restart the game
    }, 100);
  };

  const moveRoadLines = () => {
    roadLinesRef.current.forEach((item) => {
      const y = parseFloat(item.getAttribute('data-y') || '0');
      let newY = y + player.speed;
      if (newY >= 700) {
        newY -= 750;
      }
      item.setAttribute('data-y', newY.toString());
      item.style.top = newY + 'px';
    });
  };

  const moveEnemyCars = () => {
    enemyCarsRef.current.forEach((item) => {
      if (onCollision(carRef.current!, item)) {
        onGameOver();
      }
      const y = parseFloat(item.getAttribute('data-y') || '0');
      let newY = y + player.speed;
      if (newY >= 750) {
        newY = -300;
        item.style.left = Math.floor(Math.random() * 350) + 'px';
      }
      item.setAttribute('data-y', newY.toString());
      item.style.top = newY + 'px';
    });
  };

  const gamePlay = () => {
    const road = gameAreaRef.current!.getBoundingClientRect();

    if (player.start) {
      moveRoadLines();
      moveEnemyCars();

      if (keys.ArrowUp && player.y > road.top + 70)
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          y: prevPlayer.y - prevPlayer.speed,
        }));
      if (keys.ArrowDown && player.y < road.bottom - 85)
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          y: prevPlayer.y + prevPlayer.speed,
        }));
      if (keys.ArrowLeft && player.x > 0)
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          x: prevPlayer.x - prevPlayer.speed,
        }));
      if (keys.ArrowRight && player.x < road.width - 70)
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          x: prevPlayer.x + prevPlayer.speed,
        }));

      carRef.current!.style.top = player.y + 'px';
      carRef.current!.style.left = player.x + 'px';

      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        score: prevPlayer.score + 1,
      }));
      scoreRef.current!.innerHTML = 'Score: ' + player.score;

      requestAnimationFrame(gamePlay);
    }
  };

  const startGame = () => {
    setPlayer((prevPlayer) => ({ ...prevPlayer, start: true, score: 0 }));
    // gameStartAudio.current.play();
    // gameStartAudio.current.loop = true;

    gameAreaRef.current!.innerHTML = '';

    for (let i = 0; i < 5; i++) {
      const roadLineElement = document.createElement('div');
      roadLineElement.setAttribute('class', 'roadLines');
      roadLineElement.setAttribute('data-y', (i * 150).toString());
      roadLineElement.style.top = i * 150 + 'px';
      gameAreaRef.current!.appendChild(roadLineElement);
      roadLinesRef.current.push(roadLineElement);
    }

    const carElement = document.createElement('div');
    carElement.setAttribute('class', 'car');
    gameAreaRef.current!.appendChild(carElement);
    carRef.current = carElement;

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      x: carElement.offsetLeft,
      y: carElement.offsetTop,
    }));

    for (let i = 0; i < 3; i++) {
      const enemyCar = document.createElement('div');
      enemyCar.setAttribute('class', 'enemyCar');
      enemyCar.setAttribute('data-y', ((i + 1) * 350 * -1).toString());
      enemyCar.style.top = (i + 1) * 350 * -1 + 'px';
      enemyCar.style.backgroundColor = randomColor();
      enemyCar.style.left = Math.floor(Math.random() * 350) + 'px';
      gameAreaRef.current!.appendChild(enemyCar);
      enemyCarsRef.current.push(enemyCar);
    }

    requestAnimationFrame(gamePlay);
  };

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className='carGame'>
      <div className='score' ref={scoreRef}></div>
      <div className='startScreen'>
        <p>
          Press here to start <br />
          Use Arrow keys to move <br />
          If you hit another car you will lose.
        </p>
        <div>
          Select Level
          <span className='level'>
            <button
              onClick={() => setPlayer((prev) => ({ ...prev, speed: 7 }))}
            >
              Easy
            </button>
            <button
              onClick={() => setPlayer((prev) => ({ ...prev, speed: 10 }))}
            >
              Moderate
            </button>
            <button
              onClick={() => setPlayer((prev) => ({ ...prev, speed: 14 }))}
            >
              Difficult
            </button>
          </span>
        </div>
      </div>
      <div className='gameArea' ref={gameAreaRef}></div>
    </div>
  );
};

export default CarRacer;
