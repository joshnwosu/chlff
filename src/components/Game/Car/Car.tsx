/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import LeaderBoard from '../../LeaderBoard/LeaderBoard';
import PlayerStat from '../../UserInfo/PlayerStat';
import classes from './Car.module.css';
import {
  generateAdditionQuestions,
  generateDivisionQuestions,
  generateMultiplicationQuestions,
  generateSubtractionQuestions,
  Question,
} from '../../../data/questions/questions';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import { soundPlayer } from '../../../utils/sound';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Level } from '../../../interfaces/data';
import Mission from '../../Mission/Mission';
import { generateRandomAnswer } from '../../../utils/generateRandomAnswer';
import StreetObject from './StreetObject/StrettObject';
import { useNavigate } from 'react-router-dom';
import { unlockItem } from '../../../features/characters/charactersSlice';

const imagePath = '/assets/showroom/avatar';

interface Answer {
  id: number;
  text: number;
  position: number;
  left: number;
}

interface Item {
  id: number;
  name: string;
  image: string;
  locked: boolean;
}

const defaultTime = 60;
const baseSpeed = 15; // Base speed for level 1
const speedIncrement = 5; // Speed increment for each level

const getSpeedForLevel = (level: number) =>
  baseSpeed + (level - 1) * speedIncrement;

const totalQuestionsPerStage = 10; // Number of questions per stage
const totalStages = 3; // Total number of stages

export default function Car() {
  const [position, setPosition] = useState<'up' | 'down'>('down');
  const [move, setMove] = useState<number>(200);
  const [questions, setQuestions] = useState<Question[]>([]);
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
  // const [stageScores, setStageScore] = useState<StageScore[]>([]);
  const [, setCount] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [showMissionModal, setShowMissionModal] = useState(true);

  const [showModal, setShowModal] = useState(false); // Modal for unlocked item
  const [unlockedItem, setUnlockedItem] = useState<Item>(); // Unlocked item

  const movingDivRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);

  const randomPositions = [28, 198];

  const { selectedYear } = useAppSelector((state) => state.control);
  const { gameMode, selectedOperator } = useAppSelector((state) => state.game);
  const { selectedCharacter } = useAppSelector((state) => state.characters); // Selected character from Redux
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const selectedLevel = `YEAR_${selectedYear}` as keyof typeof Level;
    let questions: Question[] = [];

    switch (selectedOperator?.name) {
      case 'ADDITION':
        questions = generateAdditionQuestions(Level[selectedLevel]);
        break;
      case 'SUBTRACTION':
        questions = generateSubtractionQuestions(Level[selectedLevel]);
        break;
      case 'MULTIPLICATION':
        questions = generateMultiplicationQuestions(Level[selectedLevel]);
        break;
      case 'DIVISION':
        questions = generateDivisionQuestions(Level[selectedLevel]);
        break;
      default:
        questions = generateAdditionQuestions(Level[selectedLevel]);
    }

    setQuestions(questions);
  }, [selectedYear, selectedOperator]);

  useEffect(() => {
    if (!currentQuestion) return;

    const correctPosition =
      randomPositions[Math.floor(Math.random() * randomPositions.length)];
    const wrongPosition = randomPositions.find(
      (pos) => pos !== correctPosition
    )!;
    const roadWidth = roadRef.current?.clientWidth || 0;

    const newAnswers: Answer[] = [
      {
        id: 1,
        text: currentQuestion.answer,
        position: correctPosition,
        left: roadWidth,
      },
      {
        id: 2,
        text: generateRandomAnswer(currentQuestion.answer, 2),
        position: wrongPosition,
        left: roadWidth,
      },
    ];

    setAnswers(newAnswers);
  }, [currentQuestion]);

  useEffect(() => {
    if (isGameActive) {
      const speed = getSpeedForLevel(level);

      const interval = setInterval(() => {
        setAnswers((prevAnswers) =>
          prevAnswers.map((answer) => ({
            ...answer,
            left: answer.left - speed,
          }))
        );
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isGameActive, stage]);

  useEffect(() => {
    // let intervalId: NodeJS.Timeout;

    if (isGameActive) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            setIsGameActive(false);
            setStageMessage('Time is up! You need to replay the stage.');
            setShowStageMessage(true);
            setReplayStage(true);
            clearInterval(intervalId);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isGameActive]);

  const handleStartClick = () => {
    soundPlayer.stopSound('startgame');
    soundPlayer.setVolume('carbackground', 0.1);
    soundPlayer.playSound('carbackground');
    soundPlayer.playSound('driving');

    if (questions.length > 0) {
      const question = questions[currentQuestionIndex];
      setCurrentQuestion(question);
      setIsGameActive(true);
      setCurrentQuestionIndex(0);
      setStage(1);
      setStageMessage('');
      setShowStageMessage(false);
      setCorrectAnswers(0);
      setWrongAnswers(0);
      setTimer(defaultTime);
      setProgressPercentage(0);
      setCount(0);
    } else {
      console.error(
        'Questions not initialized. Restart the game to load questions.'
      );
    }
  };

  const handleNextStage = () => {
    if (stage < 3) {
      setStage((prevStage) => prevStage + 1);
      setShowStageMessage(false);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setCurrentQuestion(questions[0]);
      setIsGameActive(true);
      setCorrectAnswers(0);
      setWrongAnswers(0);
      setTimer(defaultTime);
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
    setReplayStage(true);
    setCurrentQuestionIndex(0); // Reset question index for the stage
    setAnswers([]); // Clear previous answers
    setCurrentQuestion(questions[0]); // Reset current question
    setIsGameActive(true); // Restart the game for the current stage
    setCorrectAnswers(0); // Reset correct answers for the current stage
    setWrongAnswers(0); // Reset wrong answers for the current stage
    setTimer(defaultTime);

    setCount((prevCount) => prevCount - totalQuestionsPerStage);
    setProgressPercentage((prev) => prev - 100);
  };

  const handleNextLevel = () => {
    soundPlayer.playSound('carbackground');
    setLevel((prevLevel) => prevLevel + 1);
    setStage(1);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(questions[0]);
    setShowStageMessage(false);
    setIsGameActive(true);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setTimer(defaultTime);
    setShowNextLevelButton(false); // Hide the "Next Level" button
    setAnswers([]);
    setProgressPercentage(0);
    setCount(0);
  };

  // Navigate to showroom
  const handleNavigateToShowroom = () => {
    navigate('/show-room', {
      state: { unlockedItem, character: selectedCharacter?.name },
    });

    console.log('Unlocked Item: ', unlockedItem);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          setPosition('up');
          break;
        case 'ArrowDown':
          setPosition('down');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    setMove(position === 'up' ? randomPositions[0] : randomPositions[1]);
  }, [position]);

  useEffect(() => {
    if (isGameActive && movingDivRef.current && answers.length > 0) {
      const carRect = movingDivRef.current.getBoundingClientRect();
      answers.forEach((answer) => {
        const answerRect = roadRef
          .current!.querySelector(`#answer-${answer.id}`)!
          .getBoundingClientRect();
        if (
          carRect.left < answerRect.left + answerRect.width &&
          carRect.left + carRect.width > answerRect.left &&
          carRect.top < answerRect.top + answerRect.height &&
          carRect.top + carRect.height > answerRect.top
        ) {
          if (answer.text === currentQuestion?.answer) {
            handleCollision(true);
          } else {
            handleCollision(false);
          }
        }
      });
    }
  }, [answers, move, currentQuestion]);

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

    const animatePointElement = movingDivRef.current?.querySelector(
      `.${classes.animatePoint}`
    );
    const animateNoPointElement = movingDivRef.current?.querySelector(
      `.${classes.animateNoPoint}`
    );
    const gasPointElement = roadRef.current?.querySelector(
      `.${classes.gasPoint}`
    );

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setTimer((prevTimer) => prevTimer + 5);

      soundPlayer.playSound('correct');
      soundPlayer.setVolume('correct', 0.3);

      animatePointElement?.classList.add(classes.showScore);

      setTimeout(() => {
        gasPointElement?.classList.add(classes.showGasPoint);
      }, 300);

      setTimeout(() => {
        animatePointElement?.classList.remove(classes.showScore);
        gasPointElement?.classList.remove(classes.showGasPoint);
      }, 1000);
    } else {
      setWrongAnswers((prev) => prev + 1);
      soundPlayer.playSound('wrong');
      soundPlayer.setVolume('wrong', 0.3);

      animateNoPointElement?.classList.add(classes.showScore);

      setTimeout(() => {
        animateNoPointElement?.classList.remove(classes.showScore);
      }, 1000);
    }

    if (currentQuestionIndex + 1 === totalQuestionsPerStage && stage < 3) {
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
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      const nextQuestion = questions[questions.indexOf(currentQuestion!) + 1];
      setCurrentQuestion(nextQuestion);
      setAnswers([]);
    }
  };

  const handleLaneClick = (lane: 'up' | 'down') => {
    setPosition(lane);
  };

  const restartGame = () => {
    // Stop any active sounds
    soundPlayer.stopSound('carbackground');
    soundPlayer.stopSound('driving');

    // Reset all game states
    setLevel(1);
    setStage(1);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(null);
    setQuestions([]); // Clear questions to force reinitialization
    setAnswers([]);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setTimer(defaultTime);
    setIsGameActive(false);
    setProgressPercentage(0);
    setStageMessage('');
    setShowStageMessage(false);
    setReplayStage(false);
    setShowNextLevelButton(false);

    // Reinitialize questions
    const selectedLevel = `YEAR_${selectedYear}` as keyof typeof Level;
    let newQuestions: Question[] = [];

    switch (selectedOperator?.name) {
      case 'ADDITION':
        newQuestions = generateAdditionQuestions(Level[selectedLevel]);
        break;
      case 'SUBTRACTION':
        newQuestions = generateSubtractionQuestions(Level[selectedLevel]);
        break;
      case 'MULTIPLICATION':
        newQuestions = generateMultiplicationQuestions(Level[selectedLevel]);
        break;
      case 'DIVISION':
        newQuestions = generateDivisionQuestions(Level[selectedLevel]);
        break;
      default:
        newQuestions = generateAdditionQuestions(Level[selectedLevel]);
    }

    setQuestions(newQuestions);

    // Reset position
    setPosition('down');
    setMove(200);

    // Optionally play start sound
    soundPlayer.playSound('startgame');
  };

  const unlockItemForLevel = (level: number) => {
    if (selectedCharacter) {
      const itemId = level; // Unlock the item corresponding to the completed level
      dispatch(
        unlockItem({
          characterName: selectedCharacter.name,
          itemId,
        })
      );

      // Find the unlocked item in the selected character's items array
      const unlockedItem = selectedCharacter.items.find(
        (item) => item.id === itemId
      );

      if (unlockedItem) {
        console.log('Unlocked Item: ', unlockedItem); // Debugging
        setUnlockedItem(unlockedItem);
        setShowModal(true);
      } else {
        console.error('Unlocked item not found in selected character items.');
      }
    } else {
      console.error('No character selected.');
    }
  };

  return (
    <div className={classes.gameWrapper}>
      <div className={classes.title}>
        <h1>{selectedOperator?.name} Challenge</h1>
      </div>

      <div className={classes.gameCenter}>
        <div className={classes.gameCenterLeft}>
          <LeaderBoard />
        </div>

        <div className={classes.gameCenterMiddle}>
          <div className={classes.carContainer}>
            <div
              className={classes['cu-road']}
              style={{
                backgroundImage: `url(${
                  gameMode?.mode.image || 'assets/car/street_grass.jpg'
                })`,
              }}
            />

            <div ref={roadRef} className={classes.road}>
              <StreetObject />
              <h1 className={classes.gasPoint}>(Gas +5)</h1>
              <div
                ref={movingDivRef}
                className={classes.car}
                style={{ top: `${move}px` }}
              >
                <h1 className={classes.animatePoint}>+5</h1>
                <h1 className={classes.animateNoPoint}>wrong</h1>
                <img
                  src={`/assets/car/car${stage}.png`}
                  className={classes.carImage}
                />
              </div>
              <div
                className={classes.lane}
                onClick={() => handleLaneClick('up')}
              ></div>
              <div
                className={classes.lane}
                onClick={() => handleLaneClick('down')}
              ></div>

              {isGameActive &&
                answers.map((answer) => (
                  <div
                    key={answer.id}
                    id={`answer-${answer.id}`}
                    className={`${classes.answer}`}
                    style={{
                      top: `${answer.position - 6}px`,
                      left: `${answer.left}px`,
                    }}
                  >
                    {answer.text}
                  </div>
                ))}
            </div>
          </div>

          <div className={classes.question}>
            {isGameActive ? (
              <div>
                <h1>
                  {currentQuestion ? `What is ${currentQuestion.question}` : ''}
                </h1>

                {questions.length > currentQuestionIndex + 1 && (
                  <div className={classes.questionQueue}>
                    {/* <p className={classes.questionQueueLabel}>Next:</p> */}
                    <div style={{ display: 'flex', gap: 20 }}>
                      {questions
                        .slice(
                          currentQuestionIndex + 1,
                          currentQuestionIndex + 4
                        )
                        .map((question, index) => (
                          <div
                            className={classes.questionQueueText}
                            key={index.toString()}
                          >
                            <p key={index}>{question.question}</p>
                          </div>
                        ))}
                    </div>
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
              </div>
            )}
          </div>
        </div>

        <div className={classes.gameCenterRight}>
          <PlayerStat
            timer={timer}
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
            totalStage={totalStages}
            stage={stage}
            level={level}
            progress={progressPercentage}
            gameType='car'
          />
        </div>
      </div>

      {showMissionModal && (
        <Mission
          onPress={() => {
            setShowMissionModal(false);
          }}
          image='assets/mission/doctor_mission/mission1_modal.png'
        />
      )}

      {replayStage && (
        <Mission
          onPress={() => {
            // handleReplayStage();
            // setReplayStage(false);
            restartGame();
          }}
          image='assets/mission/doctor_mission/mission1_gameover_modal.png'
        />
      )}

      {showNextLevelButton && (
        <Mission
          onPress={() => {
            setShowModal(true);
            // Unlock an item when a level is completed
            unlockItemForLevel(level);
          }}
          image='assets/mission/doctor_mission/mission1_passed_modal.png'
        />
      )}

      {showModal && (
        <div className={classes.modal}>
          <div className={classes['modal-content']}>
            <h2>Congratulations!</h2>
            <p>You've unlocked an item: {unlockedItem?.name}</p>
            <img
              src={`${imagePath}/${unlockedItem?.image}`}
              alt={unlockedItem?.name}
              className={classes['modal-img']}
            />
            <div>
              <CustomButton onClick={handleNavigateToShowroom}>
                View in Showroom
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
