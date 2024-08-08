import { useState, useEffect, useRef } from 'react';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import { soundPlayer } from '../../../utils/sound';
import classes from './Fish.module.css';
import './styles.css';
import { generateQuestions, Level, Question } from '../../../data/data';
import { useAppSelector } from '../../../app/hooks';
import UserDetail from '../../Shared/UserDetail/UserDetail';

interface FishProps {
  lavel?: Level;
  questions: Question[];
}

interface BoxPosition {
  x: number;
  y: number;
}

const BOX_SIZE = 100; // Size of the boxes

// Define fish types with corresponding images and sizes
const fishTypes = [
  { type: 'small', image: 'assets/fish/fish-small.png', size: 100 },
  // {
  //   type: 'medium-small',
  //   image: 'assets/fish/fish-medium-small.png',
  //   size: 120,
  // },
  // { type: 'medium', image: 'assets/fish/fish-medium.png', size: 140 },
  {
    type: 'medium-large',
    image: 'assets/fish/fish-medium-large.png',
    size: 160,
  },
  // { type: 'large', image: 'assets/fish/fish-large.png', size: 180 },
  { type: 'extra-large', image: 'assets/fish/fish-extra-large.png', size: 200 },
];

export default function Fish() {
  const [level, setLevel] = useState<Level>(Level.YEAR_1);

  const [questions, setQuestions] = useState<Question[]>(
    generateQuestions(level)
  );

  const [className, setClassName] = useState<string>('');
  const [boxPosition, setBoxPosition] = useState<BoxPosition>({ x: 0, y: 0 });
  const [prevBoxPosition, setPrevBoxPosition] = useState<BoxPosition | null>(
    null
  );
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [boxesVisible, setBoxesVisible] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [fallingBoxPosition, setFallingBoxPosition] = useState<BoxPosition[]>([
    { x: 0, y: -BOX_SIZE }, // Initial position for the left box
    { x: 0, y: -BOX_SIZE }, // Initial position for the right box
  ]);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const [isGameActive, setIsGameActive] = useState<boolean>(false); // State to track game status
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const movingBoxRef = useRef<HTMLDivElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);
  const gamePageRef = useRef<HTMLDivElement>(null); // Reference for the game page
  const [timer, setTimer] = useState<number>(60);
  const [currentFishType, setCurrentFishType] = useState<number>(0); // Track current fish type

  const { selectedYear } = useAppSelector((state) => state.control);

  useEffect(() => {
    if (selectedYear === 1) {
      setLevel(Level.YEAR_1);
      setQuestions(generateQuestions(Level.YEAR_1));
    }
    if (selectedYear === 2) {
      setLevel(Level.YEAR_2);
      setQuestions(generateQuestions(Level.YEAR_2));
    }
    if (selectedYear === 3) {
      setLevel(Level.YEAR_3);
      setQuestions(generateQuestions(Level.YEAR_3));
    }
    if (selectedYear === 4) {
      setLevel(Level.YEAR_4);
      setQuestions(generateQuestions(Level.YEAR_4));
    }
    if (selectedYear === 5) {
      setLevel(Level.YEAR_5);
      setQuestions(generateQuestions(Level.YEAR_5));
    }
    if (selectedYear === 6) {
      setLevel(Level.YEAR_6);
      setQuestions(generateQuestions(Level.YEAR_6));
    }
  }, [selectedYear]);

  useEffect(() => {
    console.log('current question: ', currentQuestion);
    console.log('questions: ', questions);
  }, [currentQuestion, questions]);

  useEffect(() => {
    if (isGameActive) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            clearInterval(timerInterval);
            setIsGameActive(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [isGameActive]);

  const handleStartClick = () => {
    soundPlayer.playUnderWaterSound();

    if (questions.length > 0) {
      const question = questions[currentQuestionIndex];
      setCurrentQuestion(question);
      setCorrectAnswer(question.answer);

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

  // const centerMovingBox = () => {
  //   if (gamePageRef.current) {
  //     const gamePageRect = gamePageRef.current.getBoundingClientRect();
  //     const centerX = gamePageRect.width / 2 - BOX_SIZE / 2;
  //     const centerY = gamePageRect.height / 2 - BOX_SIZE / 2;
  //     setBoxPosition({ x: centerX, y: centerY });
  //   }
  // };

  const centerMovingBox = () => {
    if (gamePageRef.current) {
      const gamePageRect = gamePageRef.current.getBoundingClientRect();
      const centerX =
        gamePageRect.width / 2 - fishTypes[currentFishType].size / 2;
      const centerY =
        gamePageRect.height / 2 - fishTypes[currentFishType].size / 2;
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
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].isCorrect = isCorrect;
    setQuestions(updatedQuestions);

    if (isCorrect) {
      setCorrectAnswers((prevCorrect) => prevCorrect + 1);
      if ((correctAnswers + 1) % 5 === 0) {
        setCurrentFishType((prevType) =>
          Math.min(prevType + 1, fishTypes.length - 1)
        ); // Change fish type after every 5 correct answers
      }
    } else {
      setIncorrectAnswers((prevIncorrect) => prevIncorrect + 1);
    }
    setBoxesVisible(false); // Hide boxes after collision
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
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
    // setTimer(60); // Reset timer
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      const question = questions[currentQuestionIndex + 1];
      setCurrentQuestion(question);
      setCorrectAnswer(question.answer);
    }
  };

  useEffect(() => {
    if (boxesVisible && currentQuestion) {
      detectCollision(movingBoxRef.current, leftBoxRef.current);
      detectCollision(movingBoxRef.current, rightBoxRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className={classes.layout}>
      <div className={classes.screen}>
        <div className={classes.main}>
          {Array.from({ length: 50 }).map((_, index) => (
            <span key={index} className={classes.bubble}></span>
          ))}

          <div className='container'>
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

              <RandFishRenderer isGameActive={isGameActive} />

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

                {/* Uncomment this for fish change */}
                {/* <div
                  ref={movingBoxRef}
                  style={{
                    position: 'absolute',
                    top: `${boxPosition.y}px`,
                    left: `${boxPosition.x}px`,
                    width: `${fishTypes[currentFishType].size}px`,
                    height: `${fishTypes[currentFishType].size}px`,
                    backgroundImage: `url(${fishTypes[currentFishType].image})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 2,
                    transform: `scale(${direction === 'left' ? 1 : -1}, 1)`,
                    backgroundColor: 'red',
                  }}
                /> */}

                {true && (
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
                    <img
                      src={fishTypes[currentFishType].image}
                      className='fish'
                    />
                  </div>
                )}

                {false && (
                  <div
                    ref={movingBoxRef}
                    className={`box`}
                    style={{
                      left: boxPosition.x,
                      top: boxPosition.y,
                      position: 'absolute',
                      width: `${BOX_SIZE}px`,
                      height: `${BOX_SIZE / 2}px`,
                    }}
                  >
                    <img
                      src={`assets/fish/player1-${direction}.gif`}
                      className='fish'
                    />
                  </div>
                )}
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
        </div>
      </div>
      <FishSideBar
        questions={questions}
        currentQuestionIndex={currentQuestionIndex!}
        timer={timer}
      />
    </div>
  );
}

// Random fishes moving in the ocean

const speed = 5;

interface RandFishRendererProps {
  isGameActive: boolean;
}

const RandFishRenderer: React.FC<RandFishRendererProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);
  const [fishCreated, setFishCreated] = useState(false);

  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setVw(clientWidth * 0.97);
        setVh(clientHeight * 0.97);
      }
    };

    // Set initial size
    updateContainerSize();

    window.addEventListener('resize', updateContainerSize);

    return () => {
      window.removeEventListener('resize', updateContainerSize);
    };
  }, []);

  useEffect(() => {
    if (!fishCreated && vw > 0) {
      createFish(5); // Change the number here to control the number of fish
      setFishCreated(true); // Prevent further creations
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vw, vh, fishCreated]);

  function getAngle(cx: number, cy: number, ex: number, ey: number): number {
    const dy = ey - cy;
    const dx = ex - cx;
    let theta = Math.atan2(dy, dx); // range [-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range [-180, 180]
    theta += 90; // set 0 as top, range [-90, 270]
    if (theta > 180) theta = theta - 360; // range [-180, 180]
    return Math.floor(theta);
  }

  const setPos = (el: HTMLAnchorElement, x: number, y: number) => {
    if (!containerRef.current) return;

    // Ensure the fish stays within the boundaries
    const maxX = vw - el.offsetWidth;
    const maxY = vh - el.offsetHeight;
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    // old coords
    const a = el.offsetLeft;
    const b = el.offsetTop;
    // distance
    const ax = Math.abs(a - x);
    const by = Math.abs(b - y);
    const dur = Math.floor(Math.sqrt(ax * ax + by * by)) * speed; // Using a fixed speed
    // set new coords
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    // set duration
    el.style.transitionDuration = `${dur}ms`;
    // set angle
    el.style.transform = `rotate(${getAngle(a, b, x, y)}deg)`;
    setTimeout(() => {
      setRandomPos(el);
    }, dur);
  };

  function setRandomPos(el: HTMLAnchorElement) {
    const randomX = Math.floor(Math.random() * vw);
    const randomY = Math.floor(Math.random() * vh);
    setPos(el, randomX, randomY);
  }

  function createFish(num: number) {
    if (!containerRef.current) return;

    for (let i = 0; i < num; i++) {
      const fish = document.createElement('a');
      fish.setAttribute('href', '#');
      fish.className = 'rand-fish';
      fish.textContent = '=';
      fish.style.position = 'absolute';
      fish.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
      containerRef.current.appendChild(fish);
      setRandomPos(fish);
    }
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        overflow: 'hidden',
      }}
    ></div>
  );
};

interface FishSideBarProps extends FishProps {
  currentQuestionIndex?: number;
  timer: number;
}

const FishSideBar = ({
  questions,
  currentQuestionIndex,
  timer,
}: FishSideBarProps) => {
  return (
    <div className={classes.screenInfo}>
      <UserDetail showLevel={false} />
      <div className={classes.timer}>
        <div className={classes.timerLabel}>TIME</div>
        <div className={classes.timerCounter}>
          <p className={classes.counter}>{timer}</p>
          <p className={classes.counterLabel}>Seconds Left</p>
        </div>
      </div>
      <div className={classes.questionList}>
        {questions.map((question, index) => (
          <div
            key={index}
            className={`${classes.questionItem} ${
              currentQuestionIndex === index ? classes.current : ''
            } ${question.isCorrect === true ? classes.correct : ''} ${
              question.isCorrect === false ? classes.incorrect : ''
            }`}
            onClick={() => console.log(questions[currentQuestionIndex!])}
          >
            {(index + 1).toString().padStart(2, '0')}
          </div>
        ))}
      </div>
    </div>
  );
};
