import { useState, useEffect, useRef } from 'react';
import CustomButton from '../components/Shared/CustomButton/CsutomButton';
import './fish.css';
import RandFishRenderer from './RandFishRenderer';

interface BoxPosition {
  x: number;
  y: number;
}

interface MathQuestion {
  question: string;
  options: string[];
  answer: string;
}

const BOX_SIZE = 100; // Size of the boxes

const mathQuestions: MathQuestion[] = [
  { question: '1 + 1?', options: ['1', '2'], answer: '2' },
  { question: '2 + 2?', options: ['3', '4'], answer: '4' },
  { question: '3 + 1?', options: ['4', '5'], answer: '4' },
  { question: '4 + 2?', options: ['5', '6'], answer: '6' },
  { question: '5 + 3?', options: ['7', '8'], answer: '8' },
  { question: '6 + 1?', options: ['7', '8'], answer: '7' },
  { question: '7 + 2?', options: ['8', '9'], answer: '9' },
  { question: '8 + 1?', options: ['9', '10'], answer: '9' },
  { question: '9 + 0?', options: ['9', '10'], answer: '9' },
  { question: '10 + 1?', options: ['10', '11'], answer: '11' },
];

export default function FishRenderer() {
  const [className, setClassName] = useState<string>('');
  const [boxPosition, setBoxPosition] = useState<BoxPosition>({ x: 0, y: 0 });
  const [prevBoxPosition, setPrevBoxPosition] = useState<BoxPosition | null>(
    null
  );
  const [direction, setDirection] = useState<string>('');
  const [boxesVisible, setBoxesVisible] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [fallingBoxPosition, setFallingBoxPosition] = useState<BoxPosition[]>([
    { x: 0, y: -BOX_SIZE }, // Initial position for the left box
    { x: 0, y: -BOX_SIZE }, // Initial position for the right box
  ]);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<MathQuestion | null>(
    null
  );
  const [remainingQuestions, setRemainingQuestions] =
    useState<MathQuestion[]>(mathQuestions);

  const [isGameActive, setIsGameActive] = useState<boolean>(true); // State to track game status

  const movingBoxRef = useRef<HTMLDivElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);
  const gamePageRef = useRef<HTMLDivElement>(null); // Reference for the game page

  const handleStartClick = () => {
    if (remainingQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      const question = remainingQuestions[randomIndex];
      setCurrentQuestion(question);

      setCorrectAnswer(question.answer);
      setRemainingQuestions((prevQuestions) =>
        prevQuestions.filter((_, index) => index !== randomIndex)
      );

      setClassName('fadeOutUp');
      setBoxesVisible(true);
      centerMovingBox();
      setIsGameActive(true); // Set game as active
    } else {
      alert('No more questions left. The game is over!');
    }
  };

  useEffect(() => {
    if (boxesVisible) {
      const interval = setInterval(() => {
        setFallingBoxPosition((prevPositions) => [
          { ...prevPositions[0], y: prevPositions[0].y + 5 },
          { ...prevPositions[1], y: prevPositions[1].y + 5 },
        ]);
      }, 50);

      return () => clearInterval(interval);
    }
  }, [boxesVisible]);

  const centerMovingBox = () => {
    if (gamePageRef.current) {
      const gamePageRect = gamePageRef.current.getBoundingClientRect();
      const centerX = gamePageRect.width / 2 - BOX_SIZE / 2;
      const centerY = gamePageRect.height / 2 - BOX_SIZE / 2;
      setBoxPosition({ x: centerX, y: centerY });
    }
  };

  const detectCollision = (
    dragMe: HTMLDivElement | null,
    rect: HTMLDivElement | null
  ) => {
    if (!dragMe || !rect) return;

    const object_1 = dragMe.getBoundingClientRect();
    const object_2 = rect.getBoundingClientRect();

    if (
      object_1.left < object_2.left + object_2.width &&
      object_1.left + object_1.width > object_2.left &&
      object_1.top < object_2.top + object_2.height &&
      object_1.top + object_1.height > object_2.top
    ) {
      if (rect.textContent === correctAnswer) {
        handleCollision(true);
      } else {
        handleCollision(false);
      }
    }
  };

  const handleCollision = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers((prevCorrect) => prevCorrect + 1);
    } else {
      setIncorrectAnswers((prevIncorrect) => prevIncorrect + 1);
    }
    setBoxesVisible(false); // Hide boxes after collision
    setTimeout(() => {
      if (remainingQuestions.length > 0) {
        resetGameState();
      } else {
        // alert('Game over! Your final score is ' + score);
        setIsGameActive(false); // Set game as inactive
      }
    }, 1000); // Delay before resetting (optional)
  };

  const resetGameState = () => {
    setFallingBoxPosition([
      { x: 0, y: -BOX_SIZE }, // Reset positions
      { x: 0, y: -BOX_SIZE },
    ]);
    setBoxesVisible(true);
    if (remainingQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      setCurrentQuestion(remainingQuestions[randomIndex]);
      setCorrectAnswer(remainingQuestions[randomIndex].answer);
      setRemainingQuestions((prevQuestions) =>
        prevQuestions.filter((_, index) => index !== randomIndex)
      );
    }
  };

  useEffect(() => {
    if (boxesVisible && currentQuestion) {
      detectCollision(movingBoxRef.current, leftBoxRef.current);
      detectCollision(movingBoxRef.current, rightBoxRef.current);
    }
  }, [
    boxPosition,
    fallingBoxPosition,
    boxesVisible,
    correctAnswer,
    currentQuestion,
  ]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isGameActive) return; // Prevent movement if game is inactive

    const gamePageRect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - gamePageRect.left;
    const y = event.clientY - gamePageRect.top;

    if (prevBoxPosition) {
      const newDirection = x > prevBoxPosition.x ? 'right' : 'left';
      setDirection(newDirection);
    }

    setBoxPosition({ x, y });
    setPrevBoxPosition({ x, y });
  };

  return (
    <div className='container'>
      <RandFishRenderer />
      <div className='screen'>
        <video id='backgroundVideo' playsInline autoPlay muted loop>
          <source
            id='backgroundWebm'
            src='videos/background.webm'
            type='video/webm'
          />
        </video>

        <div className={`section start-page ${className}`}>
          <div>
            <CustomButton onClick={handleStartClick}>Start</CustomButton>
          </div>
        </div>

        <div
          className='section game-page'
          onMouseMove={handleMouseMove}
          ref={gamePageRef} // Set the ref here
        >
          <h1 className='question heartBeat'>
            {currentQuestion
              ? currentQuestion.question
              : 'Click Start to begin'}
          </h1>
          <div
            ref={movingBoxRef}
            className={`box ${direction}`}
            style={{
              left: boxPosition.x,
              top: boxPosition.y,
              position: 'absolute',
              width: `${BOX_SIZE}px`,
              height: `${BOX_SIZE / 2}px`,
            }}
          >
            <img src='assets/fish/fish.png' className='fish' />
          </div>
          {boxesVisible && currentQuestion && (
            <>
              <div
                ref={leftBoxRef}
                className='falling-box left'
                style={{
                  top: fallingBoxPosition[0].y,
                  left: '50px',
                  width: `${BOX_SIZE / 2}px`,
                  height: `${BOX_SIZE / 2}px`,
                }}
              >
                {currentQuestion.options[0]}
              </div>
              <div
                ref={rightBoxRef}
                className='falling-box right'
                style={{
                  top: fallingBoxPosition[1].y,
                  right: '50px',
                  width: `${BOX_SIZE / 2}px`,
                  height: `${BOX_SIZE / 2}px`,
                }}
              >
                {currentQuestion.options[1]}
              </div>
            </>
          )}

          {false && (
            <>
              <div className='correct-answers'>
                Correct Answers: {correctAnswers}
              </div>
              <div className='incorrect-answers'>
                Incorrect Answers: {incorrectAnswers}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
