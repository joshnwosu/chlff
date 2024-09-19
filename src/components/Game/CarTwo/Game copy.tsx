import { useEffect, useState } from 'react'
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
// import { generateRandomAnswer } from '../../../utils/generateRandomAnswer';


// interface Answer {
//   id: number;
//   text: number;
//   position: number;
//   left?: number;
// }


const defaultTime = 60;
const POSITION_LEFT = 30;
const POSITION_RIGHT = 65;


const Game = () => {
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  // const [answers, setAnswers] = useState<Answer[]>([]);
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
  // const [ count, setCount] = useState<number>(0);
  // const [progressPercentage, setProgressPercentage] = useState<number>(0);
  // const [level, setLevel] = useState<number>(1);
  const [carPosition, setCarPosition] = useState<number>(50);
  const [carRotation, setCarRotation] = useState<number>(0);

  const [popup, setPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState('');
  const [progress, setProgress] = useState(0); 


  const { selectedYear } = useAppSelector((state) => state.control);
  const { selectedOperator } = useAppSelector((state) => state.game);
  const leftAnimationClass = classes.fallDiagonalLeft;
  const rightAnimationClass = classes.fallDiagonalRight;
  // const randomPositions = [POSITION_LEFT, POSITION_RIGHT];
  const [carBgAudio] = useState(new Audio('../../../../public/sound/ford-mustang-engine-1985-78386.mp3'));
  const wonAudio = new Audio('../../../../public/sound/point.wav');
  const lostAudio = new Audio('../../../../public/sound/negative.wav');

  const handleNextStage = () => {
    if (stage < 3) {
      setStage((prevStage) => prevStage + 1);
      setShowStageMessage(false);
      setCurrentQuestionIndex(0);
      // setAnswers([]);
      setCurrentQuestion(questions[0]);
      setIsGameActive(true);
      setCorrectAnswers(0);
      setWrongAnswers(0);
      setTimer(defaultTime);
    } else {
      // Move to the next level if stage 3 is completed

      // setLevel((prevLevel) => prevLevel + 1);
      setStage(1); // Reset stage to 1
      setShowStageMessage(false);
      setShowNextLevelButton(true);
      handleStartClick(); // Start the new level
    }
  };

  const handleReplayStage = () => {
    setReplayStage(true);
    setCurrentQuestionIndex(0); // Reset question index for the stage
    // setAnswers([]); // Clear previous answers
    setCurrentQuestion(questions[0]); // Reset current question
    setIsGameActive(true); // Restart the game for the current stage
    setCorrectAnswers(0); // Reset correct answers for the current stage
    setWrongAnswers(0); // Reset wrong answers for the current stage
    setTimer(defaultTime);

    // setCount((prevCount) => prevCount - totalQuestionsPerStage);
    // setProgressPercentage((prev) => prev - 100);
  };

  const handleNextLevel = () => {
    // soundPlayer.playSound('carbackground');
    // setLevel((prevLevel) => prevLevel + 1);
    setStage(1);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(questions[0]);
    setShowStageMessage(false);
    setIsGameActive(true);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setTimer(defaultTime);
    setShowNextLevelButton(false); // Hide the "Next Level" button
    // setAnswers([]);
    // setProgressPercentage(0);
    // setCount(0);
  };


  // Update handleAnswer function to check for undefined options
  const handleAnswer = (selectedAnswer: number) => {
    setProgress(((correctAnswers + 1) / questions.length) * 100); // Update progress

    if (currentQuestion) {
      if (selectedAnswer === currentQuestion.answer) {
        setCorrectAnswers((prev) => prev + 1);
        wonAudio.play();
        setPopup(true);
        setPopupMsg('Gas +5')
        setTimeout(() => {
          setPopup(false);
      }, 2000);
        if (navigator.vibrate) {
          navigator.vibrate(200); // Short vibration (200ms)
        }
      } else {
        setWrongAnswers((prev) => prev + 1);
        lostAudio.play();
        setPopup(false);
        if (navigator.vibrate) {
          navigator.vibrate([300, 100, 300]); // Long vibration with a pause (300ms on, 100ms off, 300ms on)
        }
      }

      // Increment index and set the next question
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);

      if (questions[nextIndex]) {
        setCurrentQuestion(questions[nextIndex]);
      } else {
        // End game if no more questions
        setIsGameActive(false);
        setStageMessage('Game Over!');
        carBgAudio.pause();
        carBgAudio.currentTime = 0;
      }
    }
  };



  const handleStartClick = () => {
    // soundPlayer.stopSound('startgame');
    soundPlayer.playSound('carbackground');
    if (questions.length > 0) {
      const question = questions[currentQuestionIndex];
      setCurrentQuestion(question);
      setIsGameActive(true);  // Start the game
      setCurrentQuestionIndex(0);
      setStageMessage('');
      setShowStageMessage(false);
      setCorrectAnswers(0);
      setWrongAnswers(0);
      setTimer(defaultTime);  // Reset the timer
      // setProgressPercentage(0);
      setCarPosition(50);
      setCarRotation(0);
      carBgAudio.loop = true; 
      carBgAudio.play();  // Start background audio
      setProgress(0)
    }
  };
  

  const resetCarPositionAndRotation = () => {
    setTimeout(() => {
      setCarPosition(50);
      setCarRotation(0);
    }, 500);
  };

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

      console.log("Setting options:", newOptions); // Debug log
      setOptions(newOptions);
    }
  }, [currentQuestionIndex, questions, isGameActive]);


  // Handle keydown events with updated options
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (options.length === 0) return;

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
  }, [options]);


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

                {/* <CustomButton onClick={handleStartClick}>
                Show mission
              </CustomButton> */}
              </div>
            )}
          </div>
          <div className={classes.carContainer}>
            <div className={classes.optionsContainer}>

            </div>

            <ScorePopup message={popupMsg} isVisible={popup} />

            <GameArea
              carPosition={carPosition}
              carRotation={carRotation}
              options={options}
              handleAnswer={handleAnswer}
              leftAnimationClass={leftAnimationClass}
              rightAnimationClass={rightAnimationClass}
              isGameActive={isGameActive}
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

      {/* {false && <Mission />} */}
    </div>
  )
}

export default Game