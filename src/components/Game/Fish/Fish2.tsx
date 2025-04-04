import { useState, useEffect, useRef } from 'react';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import classes from './Fish.module.css';
import './styles.css';
import { generateQuestions, Question } from '../../../data/data';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Level } from '../../../interfaces/data';
import RandFishRenderer from './RandFishRenderer/RandFishRenderer';
import RenderOceanImage from './RenderOceanImage/RenderOceanImage';
import FishAssessmentGameOver from './FishAssessmentGameOver/FishAssessmentGameOver';
import FishSelectSpeedModal from './FishSelectSpeedModal/FishSelectSpeedModal';
import { _useAudio } from '../../../hook/_useAudio';
import {
  getUserProfile,
  updateUserProfile,
} from '../../../features/user/userSlice';
import { getLeaderBoard } from '../../../features/leaderBoard/leaderBoardSlice';

interface BoxPosition {
  x: number;
  y: number;
}

const BOX_SIZE = 100;
const DEFAULT_TIME = 60;

export interface FishTypeProps {
  type: string;
  image: string;
  size: number;
}

const fishTypes: FishTypeProps[] = [
  { type: 'small', image: 'assets/fish/fish1-seahorse.png', size: 100 },
  { type: 'medium-small', image: 'assets/fish/fish2-starfish.png', size: 130 },
  { type: 'medium', image: 'assets/fish/fish3-clownfish.png', size: 200 },
  { type: 'medium-large', image: 'assets/fish/fish4-lionfish.png', size: 230 },
  { type: 'large', image: 'assets/fish/fish5-dolphin.png', size: 250 },
  { type: 'extra-large', image: 'assets/fish/fish6-whale.png', size: 250 },
];

interface FishProps {
  mode?: 'assessment' | 'in-game';
  onFishChange?: (
    currentFishType: number,
    fishTypes: FishTypeProps[],
    questions: Question[],
    currentQuestionIndex: number
  ) => void;
}

export default function Fish2({ onFishChange }: FishProps) {
  const dispatch = useAppDispatch();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [boxPosition, setBoxPosition] = useState<BoxPosition>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [boxesVisible, setBoxesVisible] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [, setIncorrectAnswers] = useState<number>(0);
  const [fallingBoxPosition, setFallingBoxPosition] = useState<BoxPosition[]>([
    { x: 0, y: -BOX_SIZE },
    { x: 0, y: -BOX_SIZE },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [timer, setTimer] = useState<number>(DEFAULT_TIME);
  const [currentFishType, setCurrentFishType] = useState<number>(0);
  const [showDifficultyModal, setShowDifficultyModal] =
    useState<boolean>(false);
  const [showGameOverModal, setShowGameOverModal] = useState<boolean>(false);
  const [showLevelCompleteModal, setShowLevelCompleteModal] =
    useState<boolean>(false);
  const [correctStreak, setCorrectStreak] = useState<number>(0);

  const movingBoxRef = useRef<HTMLDivElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);
  const gamePageRef = useRef<HTMLDivElement>(null);

  const { selectedYear } = useAppSelector((state) => state.control);
  const { user } = useAppSelector((state) => state.user);
  const { play, setBackgroundVolume, stop } = _useAudio();

  // Load questions based on selected year
  useEffect(() => {
    const selectedLevel = `YEAR_${selectedYear}` as keyof typeof Level;
    setQuestions(generateQuestions(Level[selectedLevel]));
  }, [selectedYear]);

  // Trigger onFishChange when fish type or question index changes
  useEffect(() => {
    if (onFishChange) {
      onFishChange(currentFishType, fishTypes, questions, currentQuestionIndex);
    }
  }, [currentFishType, currentQuestionIndex, onFishChange, questions]);

  // Timer logic
  useEffect(() => {
    if (isGameActive) {
      const timerInterval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0) {
            clearInterval(timerInterval);
            gameOver();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameActive]);

  // Falling boxes animation
  useEffect(() => {
    if (boxesVisible) {
      const interval = setInterval(() => {
        setFallingBoxPosition((prev) => [
          { ...prev[0], y: prev[0].y + 5 },
          { ...prev[1], y: prev[1].y + 5 },
        ]);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [boxesVisible]);

  // Collision detection
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

  const centerMovingBox = () => {
    if (gamePageRef.current) {
      const rect = gamePageRef.current.getBoundingClientRect();
      const centerX = rect.width / 2 - fishTypes[currentFishType].size / 2;
      const centerY = rect.height / 2 - fishTypes[currentFishType].size / 2;
      setBoxPosition({ x: centerX, y: centerY });
    }
  };

  const detectCollision = (
    dragMe: HTMLDivElement | null,
    rect: HTMLDivElement | null
  ) => {
    if (!dragMe || !rect) return;

    const obj1 = dragMe.getBoundingClientRect();
    const obj2 = rect.getBoundingClientRect();

    if (
      obj1.left < obj2.left + obj2.width &&
      obj1.left + obj1.width > obj2.left &&
      obj1.top < obj2.top + obj2.height &&
      obj1.top + obj1.height > obj2.top
    ) {
      handleCollision(rect.textContent === correctAnswer);
    }
  };

  const handleCollision = (isCorrect: boolean) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].isCorrect = isCorrect;
    setQuestions(updatedQuestions);

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setCorrectStreak((prev) => prev + 1);
      play('eat');
      setTimer((prev) => prev + 5);

      if ((correctStreak + 1) % 5 === 0) {
        setCurrentFishType((prev) => Math.min(prev + 1, fishTypes.length - 1));
        play('levelUp');
      }

      const animatePoint = gamePageRef.current?.querySelector('.animatePoint');
      animatePoint?.classList.add('showScore');
      setTimeout(() => animatePoint?.classList.remove('showScore'), 1000);
    } else {
      setIncorrectAnswers((prev) => prev + 1);
      setCorrectStreak(0);
      play('wrong');
    }

    setBoxesVisible(false);
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        resetGameState();
      } else {
        levelComplete();
      }
    }, 1000);
  };

  const gameOver = () => {
    setIsGameActive(false);
    play('levelUp');
    stop('underWater');
    setShowGameOverModal(true);
  };

  const levelComplete = async () => {
    setIsGameActive(false);
    play('levelUp');
    stop('underWater');
    setShowLevelCompleteModal(true);

    if (user) {
      await dispatch(
        updateUserProfile({
          uid: user?.uid,
          updatedData: {
            fishGameInfo: {
              level: (user?.fishGameInfo.level || 0) + currentLevel,
              totalTimePlayed: (user?.fishGameInfo?.totalTimePlayed || 0) + 234,
              totalFailedMissions:
                (user?.fishGameInfo?.totalFailedMissions || 0) + 1,
              totalSuccessfulMissions:
                user?.fishGameInfo?.totalSuccessfulMissions || 0,
            },
          },
        })
      )
        .unwrap()
        .then(() => {
          console.log('Profile updated successfully');
          dispatch(getUserProfile());
          dispatch(getLeaderBoard(selectedYear));
        })
        .catch((error) => console.error('Failed to update profile:', error));
    }
  };

  const resetGameState = () => {
    setFallingBoxPosition([
      { x: 0, y: -BOX_SIZE },
      { x: 0, y: -BOX_SIZE },
    ]);
    setBoxesVisible(true);
    setCurrentQuestionIndex((prev) => prev + 1);
    const nextQuestion = questions[currentQuestionIndex + 1];
    setCurrentQuestion(nextQuestion);
    setCorrectAnswer(nextQuestion.answer);
  };

  const handleStartClick = () => {
    play('underWater');
    setBackgroundVolume(0.1);
    if (questions.length > 0) {
      const question = questions[0];
      setCurrentQuestion(question);
      setCorrectAnswer(question.answer);
      setBoxesVisible(true);
      centerMovingBox();
      setIsGameActive(true);
      setCorrectStreak(0);
    }
  };

  const handleNextLevel = () => {
    setShowLevelCompleteModal(false);
    setCurrentLevel((prev) => prev + 1);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setTimer(DEFAULT_TIME);
    setCurrentFishType(0);

    const selectedLevel = `YEAR_${selectedYear}` as keyof typeof Level;
    setQuestions(generateQuestions(Level[selectedLevel]));
    setCurrentQuestion(questions[0]);
    setCorrectAnswer(questions[0].answer);
    setBoxesVisible(true);

    setIsGameActive(true);
    centerMovingBox();
    play('underWater');
    setBackgroundVolume(0.1);
  };

  const handleReplayGame = () => {
    setShowGameOverModal(false);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setTimer(DEFAULT_TIME);
    setCurrentFishType(0);
    const selectedLevel = `YEAR_${selectedYear}` as keyof typeof Level;
    setQuestions(generateQuestions(Level[selectedLevel]));
    setCurrentQuestion(questions[0]);
    setCorrectAnswer(questions[0].answer);
    setIsGameActive(true);
    centerMovingBox();
    play('underWater');
    setBackgroundVolume(0.1);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isGameActive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - fishTypes[currentFishType].size / 2;
    const y = event.clientY - rect.top;
    setDirection(x > boxPosition.x ? 'right' : 'left');
    setBoxPosition({ x, y });
  };

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
            alt='Header'
          />
          <h1 className={classes.containerTitle}>
            Level {user?.fishGameInfo.level}
          </h1>
          <h1 className={classes.containerTitle}>
            <span className={classes.timerName}>Time Left: </span>
            <span className={classes.timerValue}>{timer}</span>
          </h1>
        </div>

        <div className={classes.screen}>
          <div
            className={classes.main}
            style={{ padding: 20, position: 'relative' }}
          >
            <img
              src='/assets/elements/assessment_game_bg-frame.png'
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: 0,
              }}
              alt='Background Frame'
            />
            {Array.from({ length: 50 }).map((_, index) => (
              <span key={index} className={classes.bubble}></span>
            ))}
            <div className={classes.container}>
              <div
                className={classes.screen}
                style={{ cursor: isGameActive ? 'none' : 'auto' }}
              >
                <RenderOceanImage useBG={false} />
                {!isGameActive &&
                  !showGameOverModal &&
                  !showLevelCompleteModal && (
                    <div className='section start-page'>
                      <div>
                        <CustomButton
                          onClick={() => setShowDifficultyModal(true)}
                        >
                          Start
                        </CustomButton>
                      </div>
                    </div>
                  )}
                <RandFishRenderer isGameActive={isGameActive} />
                <div
                  className='section game-page'
                  onMouseMove={handleMouseMove}
                  ref={gamePageRef}
                >
                  <h1 className='question heartBeat'>
                    {currentQuestion
                      ? currentQuestion.question
                      : 'Click Start to Begin!'}
                  </h1>
                  <h1 className='animatePoint'>+5 seconds</h1>
                  <div
                    ref={movingBoxRef}
                    className='box'
                    style={{
                      left: boxPosition.x,
                      top: boxPosition.y,
                      position: 'absolute',
                      transform:
                        direction === 'left'
                          ? 'scaleX(1) scale(0.6)'
                          : 'scaleX(-1) scale(0.6)',
                    }}
                  >
                    <img
                      src={fishTypes[currentFishType].image}
                      className='fish'
                      alt='Fish'
                    />
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Over Modal */}
      <FishAssessmentGameOver
        mode='fish2'
        title='Level not passed!'
        score={correctAnswers}
        selected_year={selectedYear}
        total_questions={questions.length}
        handleReplayGame={handleReplayGame}
        showGameOverModal={showGameOverModal}
      />

      {/* Level Complete Modal */}
      {showLevelCompleteModal && (
        <div className={classes.modalOverlay}>
          <div className={classes.modal}>
            <h2>Level {currentLevel} Completed!</h2>
            <p>
              Score: {correctAnswers}/{questions.length}
            </p>
            <CustomButton onClick={handleNextLevel}>
              Play Next Level
            </CustomButton>
          </div>
        </div>
      )}

      {/* Difficulty Modal */}
      <FishSelectSpeedModal
        show={showDifficultyModal}
        handleClose={() => setShowDifficultyModal(false)}
        onClick={() => {
          handleStartClick();
          setShowDifficultyModal(false);
        }}
      />
    </div>
  );
}
