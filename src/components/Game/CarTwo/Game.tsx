import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  generateAdditionQuestions,
  generateDivisionQuestions,
  generateMultiplicationQuestions,
  generateSubtractionQuestions,
  Question,
} from '../../../data/questions/questions';
import Leaderboard from './Leaderboard'
import Scoreboard from './Scoreboard';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import { useAppSelector } from '../../../app/hooks';
import classes from './Game.module.css';
import GameArea from './GameArea';
import { Level } from '../../../interfaces/data';
import { soundPlayer } from '../../../utils/sound';
import ScorePopup from './ScorePopup';
import Mission from '../../Mission/Mission';
import GameScoreModal from '../../Modals/GameScoreModal/GameScoreModal';

const defaultTime = 60;
const POSITION_LEFT = 30;
const POSITION_RIGHT = 65;
const MIN_CORRECT_ANSWERS = 7;


const Game = () => {
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [options, setOptions] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [stageMessage, setStageMessage] = useState<string>('');
  const [showStageMessage, setShowStageMessage] = useState<boolean>(false);
  const [showNextLevelButton, setShowNextLevelButton] = useState<boolean>(false);
  const [replayStage, setReplayStage] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(1);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [timer, setTimer] = useState<number>(defaultTime);
  const [level, setLevel] = useState<number>(1);
  const [carPosition, setCarPosition] = useState<number>(50);
  const [carRotation, setCarRotation] = useState<number>(0);

  const [popup, setPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState('');
  const [progress, setProgress] = useState(0);
  const [imageScale, setImageScale] = useState<number>(1);
  const [secondTimer, setSecondTimer] = useState(defaultTime);
  const [showMissionModal, setShowMissionModal] = useState(true);
  const [isWrong, setIsWrong] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const { selectedYear } = useAppSelector((state) => state.control);
  const { selectedOperator } = useAppSelector((state) => state.game);
  const leftAnimationClass = classes.fallDiagonalLeft;
  const rightAnimationClass = classes.fallDiagonalRight;

  const [carBgAudio] = useState(new Audio('/sound/ford-mustang-engine-1985-78386.mp3'));
  const wonAudio = useMemo(() => new Audio('/sound/point.wav'), []);
  const lostAudio = useMemo(() => new Audio('/sound/negative.wav'), []);

  const handleReplayStage = () => {
    setIsTimeUp(false);  
    // resetStage();      
    handleStartClick();
  };

  const handleTimeUp = useCallback(() => {
    console.log("handling time up....");
  }, []);

  const handleNextLevel = () => {
    soundPlayer.playSound('carbackground');
    playFullAudioThenLoopSegment(carBgAudio, 5, 15, 10);


    setLevel((prevLevel) => {
      const newLevel = prevLevel + 1;
      console.log(`Level Completed! Moving to Level: ${newLevel}`);
      return newLevel;
    });
    setStage(1);
    setTimer(defaultTime);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setProgress(0);
    setImageScale(1);

    console.log('Starting New Level ..');

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
    handleStartClick();
  };

  const handleNextStage = () => {
    soundPlayer.stopSound('carbackground');
    soundPlayer.playSound('levelup');
    if (stage === 3) {
      handleNextLevel();
    } else {
      setStage((prevStage) => {
        const newStage = prevStage + 1;
        console.log(`Moving to Stage: ${newStage}`);
        return newStage;
      });

      console.log(`Starting Stage ${stage}`);

      setCurrentQuestionIndex(0);
      setStageMessage('');
      setShowStageMessage(false);

      setCorrectAnswers(0);
      setWrongAnswers(0);

      setTimer(defaultTime);
      setCarPosition(50);
      setCarRotation(0);

      handleStartClick();
      setProgress(100)
      if (stage === 2) {
        setProgress(200)
      }
    }
  };

  const handleStartClick = () => {
    setIsGameActive(true);
    setCurrentQuestionIndex(0);
    setStageMessage('');
    setShowStageMessage(false);
    setProgress(0);

    setCorrectAnswers(0);
    setWrongAnswers(0);

    setTimer(defaultTime);
    setCarPosition(50);
    setCarRotation(0);

    playFullAudioThenLoopSegment(carBgAudio, 5, 15, 10);
    soundPlayer.setVolume('carbackground', 0.1);
    soundPlayer.playSound('carbackground');
    soundPlayer.playSound('driving');

    if (questions.length > 0) {
      const question = questions[0];
      setCurrentQuestion(question);
    }
  };

  const playFullAudioThenLoopSegment = (audio: HTMLAudioElement, loopStart: number, loopEnd: number, fullAudioDuration: number) => {
    audio.currentTime = 0;
    audio.play();

    setTimeout(() => {
      audio.pause();
      loopAudioSegment(audio, loopStart, loopEnd);
    }, fullAudioDuration * 1000);
  };
  const loopAudioSegment = (audio: HTMLAudioElement, startTime: number, endTime: number) => {
    audio.currentTime = startTime;
    audio.play();

    audio.addEventListener('timeupdate', () => {
      if (audio.currentTime >= endTime) {
        audio.currentTime = startTime;
      }
    });
  };


  const handleAnswer = useCallback(
    (selectedAnswer: number) => {
      if (!isGameActive || !currentQuestion) return;
      soundPlayer.stopSound('startgame');
      soundPlayer.setVolume('carbackground', 0.1);
      soundPlayer.playSound('carbackground');
      soundPlayer.playSound('driving');
  
      setProgress((prevProgress) => Math.min(prevProgress + 10, 300));
  
      if (selectedAnswer === currentQuestion.answer) {
        setCorrectAnswers((prev) => prev + 1);
        wonAudio.play();
        setPopup(true);
        setPopupMsg('Gas +3');
        setTimeout(() => setPopup(false), 1000);
        setTimer((prev) => prev + 3);
      } else {
        setWrongAnswers((prev) => prev + 1);
        setIsWrong(true);
        setPopup(true);
        setPopupMsg('Wrong');
        lostAudio.play();
        setTimeout(() => setIsWrong(false), 1000);
        setTimeout(() => setPopup(false), 1000);
      }
  
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
        setCurrentQuestion(questions[nextIndex]);
      } else {
        if (correctAnswers >= MIN_CORRECT_ANSWERS) {
          setShowStageMessage(true);
          setStageMessage(`Congratulations! You've completed Stage ${stage}.`);
          setShowNextLevelButton(true);
          setReplayStage(false);
        } else {
          setShowStageMessage(true);
          setStageMessage('Replay Stage. Try again!');
          setShowNextLevelButton(false);
          setReplayStage(true);
        }
        setIsGameActive(false);
        carBgAudio.pause();
        carBgAudio.currentTime = 0;
      }
    },
    [
      isGameActive,
      currentQuestion,
      currentQuestionIndex,
      questions,
      correctAnswers,
      stage,
      wonAudio,
      lostAudio,
      carBgAudio,
      setProgress,
      setCorrectAnswers,
      setWrongAnswers,
      setTimer,
      setPopup,
      setPopupMsg,
      setIsWrong,
      setCurrentQuestionIndex,
      setCurrentQuestion,
      setShowStageMessage,
      setStageMessage,
      setShowNextLevelButton,
      setReplayStage,
      setIsGameActive
    ]
  );
  

  const resetCarPositionAndRotation = () => {
    setTimeout(() => {
      setCarPosition(50);
      setCarRotation(0);
    }, 500);
  };


  useEffect(() => {
    if (timer <= 0) {
      setIsTimeUp(true);
      setIsGameActive(false);
      if (correctAnswers >= MIN_CORRECT_ANSWERS) {
        console.log("replay stage is false");

      } else {
        setReplayStage(true);
      }
    }
  }, [correctAnswers, handleTimeUp, isGameActive, isTimeUp, replayStage, timer]);

  useEffect(() => {
    if (isTimeUp && !isGameActive) {
      handleTimeUp();
      setShowScore(true)
    }
  }, [isTimeUp, isGameActive, replayStage, handleTimeUp, correctAnswers]);

  useEffect(() => {
    console.log(`Current Level: ${level}`);
  }, [level]);

  useEffect(() => {
    console.log(`Current Stage: ${stage}`);
  }, [stage]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    if (isGameActive && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0 || !isGameActive) {
      setIsGameActive(false);
      carBgAudio.pause();
      carBgAudio.currentTime = 0;
    }

    return () => clearInterval(timerInterval);
  }, [isGameActive, timer, carBgAudio]);

  useEffect(() => {
    let secondInterval: NodeJS.Timeout | null = null;
    if (isGameActive && timer > 0) {
      secondInterval = setInterval(() => {
        setSecondTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setSecondTimer(0);
    }

    return () => {
      if (secondInterval) clearInterval(secondInterval);
    };
  }, [isGameActive, timer]);

  useEffect(() => {
    const maxScale = 2
    const scaleIncrement = (maxScale - 1) / defaultTime;
    const newScale = Math.min(1 + secondTimer * scaleIncrement, maxScale);
    setImageScale(newScale);
  }, [secondTimer]);

  useEffect(() => {
    if (isGameActive) {
      carBgAudio.play();
    } else {
      carBgAudio.pause();
      carBgAudio.currentTime = 0;
    }

    return () => {
      carBgAudio.pause();
      carBgAudio.currentTime = 0;
    };
  }, [isGameActive, carBgAudio]);


  useEffect(() => {
    if (questions.length > 0 && isGameActive) {
      const currentAnswer = questions[currentQuestionIndex]?.answer;
      const randomOffset = Math.random() > 0.5 ? 1 : -1;
      const randomAnswer = currentAnswer + randomOffset;
      const newOptions = [currentAnswer, randomAnswer].sort(() => Math.random() - 0.5);

      setOptions(newOptions);
    }
  }, [currentQuestionIndex, questions, isGameActive]);

  useEffect(() => {
    const handleScreenClick = (event: MouseEvent) => {
      if (!isGameActive || options.length === 0) return;

      const screenWidth = window.innerWidth;
    const clickPosition = event.clientX;

      if (clickPosition < screenWidth / 2) {
        const newPosition = POSITION_LEFT;
        setCarPosition(newPosition);
        setCarRotation(10);
        resetCarPositionAndRotation();
        handleAnswer(options[0]);
      } else {
        const newPosition = POSITION_RIGHT;
        setCarPosition(newPosition);
        setCarRotation(-10);
        resetCarPositionAndRotation();
        handleAnswer(options[1]);
      }
    };

    window.addEventListener('click', handleScreenClick);

    return () => {
      window.removeEventListener('click', handleScreenClick);
    };
  }, [isGameActive, options, handleAnswer]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isGameActive || options.length === 0) return;

      if (event.key === 'ArrowLeft') {
        const newPosition = POSITION_LEFT;
        setCarPosition(newPosition);
        setCarRotation(10);
        resetCarPositionAndRotation();
        handleAnswer(options[0]);
      } else if (event.key === 'ArrowRight') {
        const newPosition = POSITION_RIGHT;
        setCarPosition(newPosition);
        setCarRotation(-10);
        resetCarPositionAndRotation();
        handleAnswer(options[1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGameActive, options, handleAnswer]);

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

  return (
    <div className={classes.gameWrapper}>
      <div className={classes.title}>
        <h1>{selectedOperator?.name} Challenge</h1>
      </div>

      <div className={classes.gameCenter}>
        <div className={classes.gameCenterLeft}>
          <Leaderboard />
        </div>

        <div className={classes.gameCenterMiddle}>
          <div className={classes.question}>
            {isGameActive ? (
              <div>
                <h1>
                  {currentQuestion ? `What is ${currentQuestion.question}` : ''}
                </h1>

                {questions.length > currentQuestionIndex + 1 && (
                  <div className={classes.questionQueue}>
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
                  <CustomButton onClick={stage === 3 ? handleNextLevel : handleNextStage}>
                    {stage === 3 ? 'Next Level' : 'Next Stage'}
                  </CustomButton>
                ) : (
                  <CustomButton onClick={handleReplayStage}>
                    {stage === 3 ? 'Next Level' : 'Replay Stage'}
                  </CustomButton>
                )}

              </div>
            ) : (
              <div style={{ display: 'flex', gap: 10 }}>
                <CustomButton onClick={handleStartClick}>
                  {replayStage && isTimeUp ? 'Replay Stage' : 'Start Game'}
                </CustomButton>
              </div>
            )}


          </div>
          <div className={classes.carContainer}>
            <ScorePopup message={popupMsg} isVisible={popup} isWrong={isWrong} />

            <GameArea
              carPosition={carPosition}
              carRotation={carRotation}
              options={options}
              handleAnswer={handleAnswer}
              leftAnimationClass={leftAnimationClass}
              rightAnimationClass={rightAnimationClass}
              isGameActive={isGameActive}
              imageScale={imageScale}
              level={level}
            />


          </div>

        </div>

        <div className={classes.gameCenterRight}>
          <Scoreboard
            correctAnswers={correctAnswers}
            incorrectAnswers={wrongAnswers}
            progress={progress}
            timeLeft={timer}
          />
        </div>
      </div>

      {showScore && !isGameActive && (
        <div className='absolute'>
          <GameScoreModal title='Score' children={correctAnswers} />
        </div>
      )}

      {showMissionModal && (
        <Mission onPress={() => setShowMissionModal(false)} />
      )}
    </div>
  )
}

export default Game