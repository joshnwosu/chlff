import { useState, useEffect, useRef } from 'react';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import { soundPlayer } from '../../../utils/sound';
import classes from './Fish.module.css';
import './styles.css';
import { generateQuestions, Question } from '../../../data/data';
import { useAppSelector } from '../../../app/hooks';
// import UserDetail from '../../Shared/UserDetail/UserDetail';
import {
  calculatePercentage,
  determineStrengthLevel,
} from '../../../utils/performanceUtils';
import { Level } from '../../../interfaces/data';
import RandFishRenderer from './RandFishRenderer/RandFishRenderer';
import FishAssessmentSideBar from './FishAssessmentSideBar/FishAssessmentSideBar';
import RenderOceanImage from './RenderOceanImage/RenderOceanImage';
import FishAssessmentGameOver from './FishAssessmentGameOver/FishAssessmentGameOver';
import FishSelectSpeedModal from './FishSelectSpeedModal/FishSelectSpeedModal';

interface BoxPosition {
  x: number;
  y: number;
}

const BOX_SIZE = 100; // Size of the boxes

const defaultTime = 60;

// Define fish types with corresponding images and sizes
const fishTypes = [
  { type: 'small', image: 'assets/fish/fish-small.png', size: 150 },
  { type: 'medium', image: 'assets/fish/player1-left.gif', size: 200 },
  // { type: 'large', image: 'assets/fish/fish-medium.png', size: 250 },
  { type: 'extra-large', image: 'assets/fish/fish-extra-large.png', size: 300 },
];

interface FishProps {
  mode: 'assessment' | 'in-game';
  questions?: Question[];
  timer?: number;
  getCurrentQuestionIndex?: (val: number) => void;
}

export default function Fish({ mode }: FishProps) {
  const [questions, setQuestions] = useState<Question[]>([]);

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
  const [timer, setTimer] = useState<number>(defaultTime);
  const [currentFishType, setCurrentFishType] = useState<number>(0); // Track current fish type
  const [showDifficultyModal, setShowDifficultyModal] =
    useState<boolean>(false);

  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [strengthLevel, setStrengthLevel] = useState<string>('');
  const [correctStreak, setCorrectStreak] = useState<number>(0);

  const { selectedYear } = useAppSelector((state) => state.control);

  useEffect(() => {
    const selectedLevel = `YEAR_${selectedYear}` as keyof typeof Level;
    setQuestions(generateQuestions(Level[selectedLevel]));
  }, [selectedYear]);

  useEffect(() => {
    if (isGameActive) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            clearInterval(timerInterval);

            gameOver();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameActive]);

  const handleStartClick = () => {
    soundPlayer.stopSound('startgame');
    soundPlayer.playSound('underwater');
    soundPlayer.playSound('backgroundfish');

    if (questions.length > 0) {
      const question = questions[currentQuestionIndex];
      setCurrentQuestion(question);
      setCorrectAnswer(question.answer);

      setClassName('fadeOutUp');
      setBoxesVisible(true);
      centerMovingBox();
      setIsGameActive(true); // Set game as active
      setCorrectStreak(0);
    } else {
      alert('No more questions left. The game is over!');
    }
  };

  const handleReplayGame = () => {
    setShowGameOverModal(false);
    soundPlayer.playSound('underwater');
    soundPlayer.playSound('backgroundfish');

    const selectedLevel = `YEAR_${selectedYear}` as keyof typeof Level;
    setQuestions(generateQuestions(Level[selectedLevel]));

    setCurrentQuestion(questions[0]);
    setCorrectAnswer(questions[0].answer);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);

    setTimer(defaultTime);
    setIsGameActive(true);
    centerMovingBox();
    setCorrectStreak(0);
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

    const animatePointElement =
      gamePageRef.current?.querySelector('.animatePoint');

    if (isCorrect) {
      setCorrectAnswers((prevCorrect) => prevCorrect + 1);
      setCorrectStreak((prevStreak) => prevStreak + 1);

      //Play sound when the correct answer is collided with
      soundPlayer.playSound('eat');

      // Add 5 seconds to the timer
      setTimer((prevTimer) => prevTimer + 5);

      // Change fish type after every 5 correct answers in a row
      if ((correctStreak + 1) % 5 === 0) {
        setCurrentFishType((prevType) =>
          Math.min(prevType + 1, fishTypes.length - 1)
        );
      }

      animatePointElement?.classList.add('showScore');

      setTimeout(() => {
        animatePointElement?.classList.remove('showScore');
      }, 1000);
    } else {
      setIncorrectAnswers((prevIncorrect) => prevIncorrect + 1);
      setCorrectStreak(0);
      soundPlayer.playSound('wrong');
    }
    setBoxesVisible(false); // Hide boxes after collision
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        resetGameState();
      } else {
        // alert('Game over! Your final score is ' + score);
        gameOver();
      }
    }, 1000); // Delay before resetting (optional)
  };

  const gameOver = () => {
    setIsGameActive(false); // Set game as inactive
    const percentage = calculatePercentage(correctAnswers, questions.length);
    const level = determineStrengthLevel(percentage);

    // console.log('Child Performance: ', level, correctAnswers);
    setStrengthLevel(level);

    soundPlayer.stopSound('underwater');
    soundPlayer.stopSound('backgroundfish');
    soundPlayer.playSound('levelup');
    setShowGameOverModal(true);
    setCorrectStreak(0);
  };

  const resetGameState = () => {
    setFallingBoxPosition([
      { x: 0, y: -BOX_SIZE }, // Reset positions
      { x: 0, y: -BOX_SIZE },
    ]);
    setBoxesVisible(true);

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

          <div className={classes.container}>
            <div className={classes.screen}>
              {false && (
                <video
                  id='backgroundVideo'
                  playsInline
                  autoPlay
                  muted
                  loop
                  preload='true'
                >
                  <source
                    id='backgroundWebm'
                    src='videos/background.mp4'
                    type='video/webm'
                  />
                </video>
              )}

              {true && <RenderOceanImage />}

              <div className={`section start-page ${className}`}>
                <div>
                  <CustomButton
                    // onClick={handleStartClick}
                    onClick={() => setShowDifficultyModal(true)}
                  >
                    Start
                  </CustomButton>
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
                    : 'Click Start to Begin!'}
                </h1>

                <h1 className={'animatePoint'}>+5 seconds</h1>

                {true && (
                  <div
                    ref={movingBoxRef}
                    className={`box`}
                    style={{
                      left: boxPosition.x,
                      top: boxPosition.y,
                      position: 'absolute',

                      width: `${fishTypes[currentFishType].size}px`, // Dynamic width
                      height: `${fishTypes[currentFishType].size / 2}px`, // Dynamic height
                      transform:
                        direction === 'left' ? 'scaleX(1)' : 'scaleX(-1)',
                      transition: 'transform 300ms linear',
                    }}
                  >
                    <img
                      src={fishTypes[currentFishType].image}
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

      {mode === 'assessment' && (
        <>
          <FishAssessmentSideBar
            questions={questions}
            currentQuestionIndex={currentQuestionIndex!}
            timer={timer}
          />

          <FishAssessmentGameOver
            score={correctAnswers}
            selected_year={selectedYear}
            total_questions={questions.length}
            visible={showGameOverModal}
            strengthLevel={strengthLevel}
            handleReplayGame={handleReplayGame}
            showGameOverModal={showGameOverModal}
          />
        </>
      )}

      <FishSelectSpeedModal
        show={showDifficultyModal}
        handleClose={() => setShowDifficultyModal(!showDifficultyModal)}
        onClick={(val) => {
          console.log('val: ', val);
          handleStartClick();
          setShowDifficultyModal(false);
        }}
      />
    </div>
  );
}
