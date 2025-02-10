import { useState, useEffect, useRef } from 'react';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import { soundPlayer } from '../../../utils/sound';
import classes from './Fish.module.css';
import './styles.css';
import { generateQuestions, Question } from '../../../data/data';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
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
import { updateUserProfile } from '../../../features/auth/authSlice';
import { getUserProfile } from '../../../features/user/userSlice';

interface BoxPosition {
  x: number;
  y: number;
}

const BOX_SIZE = 100; // Size of the boxes

const defaultTime = 60;

export interface FishTypeProps {
  type: string;
  image: string;
  size: number;
}

// Define fish types with corresponding images and sizes
const fishTypes: FishTypeProps[] = [
  { type: 'small', image: 'assets/fish/fish1-seahorse.png', size: 100 },
  { type: 'medium-small', image: 'assets/fish/fish2-starfish.png', size: 130 },
  { type: 'medium', image: 'assets/fish/fish3-clownfish.png', size: 200 },
  { type: 'medium-large', image: 'assets/fish/fish4-lionfish.png', size: 230 },
  { type: 'large', image: 'assets/fish/fish5-dolphin.png', size: 250 },
  { type: 'extra-large', image: 'assets/fish/fish6-whale.png', size: 250 },
];

interface FishProps {
  mode: 'assessment' | 'in-game';
  questions?: Question[];
  timer?: number;
  getCurrentQuestionIndex?: (val: number) => void;
  onFishChange?: (currentFishType: number, fishTypes: FishTypeProps[]) => void; // Callback to send fish data
}

export default function Fish({ mode, onFishChange }: FishProps) {
  const dispatch = useAppDispatch();
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
  const [currentLevel, setCurrentLevel] = useState<number>(1); // Track current level
  const [showDifficultyModal, setShowDifficultyModal] =
    useState<boolean>(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [strengthLevel, setStrengthLevel] = useState<string>('');
  const [correctStreak, setCorrectStreak] = useState<number>(0);

  const { selectedYear } = useAppSelector((state) => state.control);
  const { user } = useAppSelector((state) => state.user);

  // Load level from local storage on component mount
  useEffect(() => {
    const savedLevel = localStorage.getItem('fishGameLevel');
    if (savedLevel) {
      setCurrentLevel(parseInt(savedLevel, 10));
    }
  }, []);

  // Save level to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('fishGameLevel', currentLevel.toString());
  }, [currentLevel]);

  // Generate questions based on the current level
  useEffect(() => {
    const selectedLevel =
      `YEAR_${selectedYear}_LEVEL_${currentLevel}` as keyof typeof Level;
    setQuestions(generateQuestions(Level[selectedLevel]));
  }, [selectedYear, currentLevel]);

  useEffect(() => {
    if (onFishChange) {
      onFishChange(currentFishType, fishTypes);
    }
  }, [currentFishType, onFishChange]);

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

    setCurrentLevel(1); // Reset to level 1
    const selectedLevel =
      `YEAR_${selectedYear}_LEVEL_${currentLevel}` as keyof typeof Level;
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

  const gameOver = async () => {
    setIsGameActive(false); // Set game as inactive
    const percentage = calculatePercentage(correctAnswers, questions.length);
    const level = determineStrengthLevel(percentage);

    setStrengthLevel(level);
    setShowGameOverModal(true);
    setCorrectStreak(0);

    if (user) {
      await dispatch(
        updateUserProfile({
          uid: user.uid,
          updatedData: {
            assessmentPassed: level === 'Failed' ? false : true,
            assessmentScore: correctAnswers + 1,
            year: selectedYear,
          },
        })
      );

      dispatch(getUserProfile());
    }

    // Move to the next level if the player has passed the current level
    if (level !== 'Failed') {
      setCurrentLevel((prevLevel) => prevLevel + 1);
    }
  };

  // ... rest of your existing code (e.g., detectCollision, handleCollision, resetGameState, etc.)

  return (
    <div className={classes.layout}>
      <div
        style={{
          width: '100%',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '90px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 50px',
            position: 'relative',
            paddingTop: 10,
          }}
        >
          <img
            src='/assets/elements/assessment_game_header.png'
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 0,
            }}
          />
          <h1 className={classes.containerTitle}>
            Year {selectedYear} Assessment - Level {currentLevel}
          </h1>

          <h1 className={classes.containerTitle}>
            <span className={classes.timerName}>Time Left: </span>
            <span className={classes.timerValue}>{timer}</span>
          </h1>
        </div>

        {/* ... rest of your existing UI code */}
      </div>

      {mode === 'assessment' && (
        <>
          <div>
            <FishAssessmentSideBar
              questions={questions}
              currentQuestionIndex={currentQuestionIndex!}
              timer={timer}
            />
          </div>

          {showGameOverModal && (
            <FishAssessmentGameOver
              score={correctAnswers}
              selected_year={selectedYear}
              total_questions={questions.length}
              strengthLevel={strengthLevel}
              handleReplayGame={handleReplayGame}
              showGameOverModal={showGameOverModal}
            />
          )}
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
