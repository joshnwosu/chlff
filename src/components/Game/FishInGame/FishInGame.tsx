import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import LeaderBoard from '../../LeaderBoard/LeaderBoard';
import classes from './FishInGame.module.css';

import CustomButton from '../../Shared/CustomButton/CsutomButton';
import { soundPlayer } from '../../../utils/sound';
import { generateQuestionsForGame } from '../../../utils/generateQuestionsForGame';
import RenderOceanImage from '../Fish/RenderOceanImage/RenderOceanImage';
import RandFishRenderer from '../Fish/RandFishRenderer/RandFishRenderer';
import PlayerStat from '../../UserInfo/PlayerStat';
import { Question } from '../../../data/questions/questions';
import { generateRandomAnswer } from '../../../utils/generateRandomAnswer';
import Bubbles from '../Fish/Bubbles/Bubbles';

interface Answer {
  id: number;
  text: number;
  position: string;
  left?: number;
}

interface BoxPosition {
  x: number;
  y: number;
}

const BOX_SIZE = 100; // Size of the boxes

const defaultTime = 60;

const getSpeedForLevel = (level: number) => {
  const baseSpeed = 5000; // Speed for level 1 in milliseconds
  const speedDecrement = 500; // The amount to decrease the speed per level
  const minimumSpeed = 1000; // Minimum speed to prevent speed from becoming too fast

  // Calculate the speed for the current level
  const speed = baseSpeed - (level - 1) * speedDecrement;

  // Ensure that the speed does not go below the minimum speed
  return Math.max(speed, minimumSpeed);
};

const totalQuestionsPerStage = 10; // Number of questions per stage
const totalStages = 3; // Total number of stages

export default function FishInGame() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const [boxPosition, setBoxPosition] = useState<BoxPosition>({ x: 0, y: 0 });
  const [prevBoxPosition, setPrevBoxPosition] = useState<BoxPosition | null>(
    null
  );
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [boxesVisible, setBoxesVisible] = useState<boolean>(true);
  const [correctAnswer, setCorrectAnswer] = useState<number>();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [stage, setStage] = useState<number>(1);
  const [stageMessage, setStageMessage] = useState<string>('');
  const [showStageMessage, setShowStageMessage] = useState<boolean>(false);
  const [replayStage, setReplayStage] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(defaultTime);
  const [level, setLevel] = useState<number>(1);
  const [showNextLevelButton, setShowNextLevelButton] =
    useState<boolean>(false);
  const [, setCount] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  const movingBoxRef = useRef<HTMLDivElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);
  const gamePageRef = useRef<HTMLDivElement>(null);

  const { selectedYear } = useAppSelector((state) => state.control);
  const { selectedGame } = useAppSelector((state) => state.game);

  useEffect(() => {
    setQuestions(generateQuestionsForGame(selectedYear, selectedGame));
  }, [selectedYear, selectedGame]);

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

  useEffect(() => {
    if (!currentQuestion) return;

    // Randomly choose if the correct answer will be on the left or right
    const correctOnLeft = Math.random() < 0.5;

    const oceanWidth = gamePageRef.current?.clientWidth || 0;

    const newAnswers: Answer[] = [
      {
        id: 1,
        text: currentQuestion.answer,
        position: correctOnLeft ? 'left' : 'right',
        left: oceanWidth, // Adjust for placement on the road
      },
      {
        id: 2,
        text: generateRandomAnswer(currentQuestion.answer, 2),
        position: correctOnLeft ? 'right' : 'left',
        left: oceanWidth, // Adjust for placement on the road
      },
    ];

    setAnswers(newAnswers);
  }, [currentQuestion]);

  const handleStartClick = () => {
    if (questions.length > 0) {
      centerMovingBox();

      setCurrentQuestion(questions[0]);
      setCorrectAnswer(questions[0].answer);
      setIsGameActive(true);
      setBoxesVisible(true);
      setTimer(defaultTime);
      setCurrentQuestionIndex(0);
      setStage(1);
      setCount(0);
      setShowStageMessage(false);
      setCorrectAnswers(0);
      setWrongAnswers(0);
      setStageMessage('');
      setProgressPercentage(0);
    }
  };

  const centerMovingBox = () => {
    if (gamePageRef.current) {
      const gamePageRect = gamePageRef.current.getBoundingClientRect();
      const centerX = gamePageRect.width / 2;
      const centerY = gamePageRect.height / 2;
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
      if (Number(rect.textContent) === correctAnswer) {
        handleCollision(true);
      } else {
        handleCollision(false);
      }
    }
  };

  const calculateProgress = (count: number) => {
    const totalQuestions = totalQuestionsPerStage * totalStages * 2; // 40 questions in total
    return (count / totalQuestions) * 100 * 2;
  };

  const handleCollision = (isCorrect: boolean) => {
    setCount((prev) => {
      const newCount = prev + 1;
      const progressPercentage = calculateProgress(newCount);

      // console.log(`Progress: ${progressPercentage}%`);
      setProgressPercentage(progressPercentage * totalStages);

      return newCount;
    });

    if (isCorrect) {
      setCorrectAnswers((prevCorrect) => prevCorrect + 1);
      setTimer((prevTimer) => prevTimer + 5);
    } else {
      setWrongAnswers((prevWrong) => prevWrong + 1);
    }

    setBoxesVisible(false);

    if (currentQuestionIndex + 1 === totalQuestionsPerStage && stage < 3) {
      console.log('Hiiii');
      if (correctAnswers > wrongAnswers) {
        setStageMessage(
          `Stage ${stage} completed, moving to Stage ${stage + 1}`
        );
        setShowStageMessage(true);
        setIsGameActive(false);
        setReplayStage(false);
      } else {
        setStageMessage('You failed this stage, try again!');
        setShowStageMessage(true);
        setIsGameActive(false);
        setReplayStage(true); // Need to replay the current stage
      }
    } else if (
      currentQuestionIndex + 1 === totalQuestionsPerStage &&
      stage === 3
    ) {
      console.log('Heyyyy');
      if (correctAnswers > wrongAnswers) {
        setStageMessage(
          `Level ${level} completed, moving to Level ${level + 1}`
        );
        setShowStageMessage(true);
        setIsGameActive(false);
        soundPlayer.stopSound('carbackground');
        soundPlayer.playSound('levelup');
        setShowNextLevelButton(true);
      } else {
        setStageMessage('You failed this stage, try again!');
        setShowStageMessage(true);
        setIsGameActive(false);
        setReplayStage(true); // Need to replay the current stage
      }
    } else {
      resetGameState();
    }
  };

  const gameOver = () => {
    setIsGameActive(false);
  };

  useEffect(() => {
    if (boxesVisible && currentQuestion) {
      detectCollision(movingBoxRef.current, leftBoxRef.current);
      detectCollision(movingBoxRef.current, rightBoxRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxPosition, boxesVisible, correctAnswer, currentQuestion]);

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

  const handleNextLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
    setStage(1);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(questions[0]);
    setCorrectAnswer(questions[0].answer);
    setShowStageMessage(false);
    setIsGameActive(true);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setTimer(defaultTime);
    setShowNextLevelButton(false); // Hide the "Next Level" button
    setAnswers([]);
    setProgressPercentage(0);
    setCount(0);
    setBoxesVisible(true);
  };

  const handleNextStage = () => {
    if (stage < 3) {
      setStage((prevStage) => prevStage + 1);
      setIsGameActive(true);
      setCorrectAnswers(0);
      setWrongAnswers(0);
      setShowStageMessage(false);
      setCurrentQuestionIndex(0);
      setBoxesVisible(true);
      setCurrentQuestion(questions[0]);
      setCorrectAnswers(0);
      setWrongAnswers(0);
      setCorrectAnswer(questions[0].answer);
    } else {
      // Move to the next level if stage 3 is completed

      setLevel((prevLevel) => prevLevel + 1);
      setStage(1); // Reset stage to 1
      setShowStageMessage(false);
      setShowNextLevelButton(true);
      handleStartClick(); // Start the new level
    }
  };
  const handleReplayStage = () => {
    setShowStageMessage(false);
    setBoxesVisible(true);
    setReplayStage(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCurrentQuestion(questions[0]);
    setCorrectAnswer(questions[0].answer);
    setIsGameActive(true);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setTimer(defaultTime);
    setCount((prevCount) => prevCount - totalQuestionsPerStage);
    setProgressPercentage((prev) => prev - 100);
  };

  const resetGameState = () => {
    setBoxesVisible(true);
    // if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    const question = questions[currentQuestionIndex + 1];
    setCurrentQuestion(question);
    setCorrectAnswer(question.answer);
    setAnswers([]);
    setTimer(defaultTime);

    // }
  };

  return (
    <div className={classes.gameWrapper}>
      <div className={classes.title}>
        <h1>{selectedGame?.name} Challenge</h1>
      </div>

      <div className={classes.gameCenter}>
        <div className={classes.gameCenterLeft}>
          <LeaderBoard />
        </div>

        <div className={classes.gameCenterMiddle}>
          <div className={classes.container}>
            <Bubbles />
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
                      width: `${BOX_SIZE}px`,
                      height: `${BOX_SIZE / 2}px`,
                    }}
                  >
                    {direction === 'left' ? (
                      <img
                        src={`assets/fish/player1-left.gif`}
                        className='fish'
                      />
                    ) : (
                      <img
                        src={`assets/fish/player1-right.gif`}
                        className='fish'
                      />
                    )}
                  </div>
                )}

                {isGameActive &&
                  boxesVisible &&
                  answers.map((answer) => (
                    <div
                      key={answer.id}
                      ref={
                        answer.position === 'left' ? leftBoxRef : rightBoxRef
                      }
                      className={'falling-box'}
                      style={{
                        width: `${BOX_SIZE / 2}px`,
                        height: `${BOX_SIZE / 2}px`,
                        top: 0,
                        left: answer.position === 'left' ? `50px` : 'auto',
                        right: answer.position === 'right' ? `50px` : 'auto',
                        animationDuration: `${getSpeedForLevel(level)}ms`,
                      }}
                    >
                      {answer.text}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className={classes.question}>
            {isGameActive ? (
              <div>
                {/* <h1>{getSpeedForLevel(level)}ms</h1> */}
                {questions.length > currentQuestionIndex + 1 && (
                  <div className={classes.questionQueue}>
                    {questions
                      .slice(currentQuestionIndex + 1, currentQuestionIndex + 4)
                      .map((question, index) => (
                        <div
                          className={classes.questionQueueText}
                          key={index.toString()}
                        >
                          <p key={index}>{question.question}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ) : showStageMessage ? (
              <div className={classes.stageMessage}>
                <h2>{stageMessage}</h2>
                {showNextLevelButton ? (
                  <CustomButton onClick={handleNextLevel}>
                    Next Level
                  </CustomButton>
                ) : (
                  <CustomButton
                    onClick={replayStage ? handleReplayStage : handleNextStage}
                  >
                    {replayStage
                      ? 'Replay Stage'
                      : stage === 3
                      ? 'Play Again'
                      : `Start Stage ${stage + 1}`}
                  </CustomButton>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 10 }}>
                <CustomButton onClick={handleStartClick}>
                  Start Game
                </CustomButton>

                <CustomButton onClick={handleStartClick}>
                  Show mission
                </CustomButton>
              </div>
            )}
          </div>
        </div>

        <div className={classes.gameCenterRight}>
          <PlayerStat
            unit={timer}
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
            totalStage={totalStages}
            stage={stage}
            level={level}
            progress={progressPercentage}
            gameType='fish'
          />
        </div>
      </div>
    </div>
  );
}
