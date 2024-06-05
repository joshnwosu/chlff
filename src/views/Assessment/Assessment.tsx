import classes from './Assessment.module.css';
import { useEffect, useState } from 'react';
import { generateQuestions, Level, Question } from '../../data/data';
import PageWrapper from '../../components/Shared/PageWrapper/PageWrapper';
import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import GameOver from '../../components/GameOver/GameOver';

const Assessment: React.FC = () => {
  const [level, setLevel] = useState<Level>(Level.PRIMARY_1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>(
    generateQuestions(level)
  );
  const [timer, setTimer] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameActive, setGameActive] = useState<boolean>(false);

  useEffect(() => {
    if (gameActive) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            clearInterval(timerInterval);
            setGameOver(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [gameActive]);

  const handleQuestionClick = (index: number) => {
    setCurrentQuestionIndex(index);
    setSelectedOption(null);
  };

  const handleOptionClick = (option: string) => {
    if (!gameActive) {
      setGameActive(true);
    }
    if (selectedOption === null) {
      setSelectedOption(option);
      const updatedQuestions = [...questions];
      const isCorrect =
        option === updatedQuestions[currentQuestionIndex].answer;
      updatedQuestions[currentQuestionIndex].isCorrect = isCorrect;
      setQuestions(updatedQuestions);

      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
        setTimer((prevTimer) => Math.min(prevTimer + 5, 60));
      } else {
        // setTimer((prevTimer) => Math.max(prevTimer - 5, 0));
      }

      setTimeout(() => {
        goToNextQuestion();
      }, 300);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < generateQuestions(level).length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    } else {
      // Quiz finished, show results or navigate to another page
      console.log('Quiz finished: ', questions);
      setGameOver(true);
      setGameActive(false);
    }
  };

  const restartGame = () => {
    setLevel(Level.PRIMARY_1);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuestions(generateQuestions(Level.PRIMARY_1));
    setTimer(60);
    setScore(0);
    setGameOver(false);
    setGameActive(true);
  };

  return (
    <PageWrapper>
      <div className={classes.container}>
        <h1 className={classes.containerTitle}>Year 2 Assessment Questions</h1>

        <div className={classes.layout}>
          <div className={classes.screen}>
            <div className={classes.animation}>
              <div className={classes.question}>
                <p>
                  {`${(currentQuestionIndex + 1).toString().padStart(2, '0')})`}{' '}
                  {questions[currentQuestionIndex].question}
                </p>
              </div>
            </div>
            <div className={classes.options}>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <CustomButton
                  key={index}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </CustomButton>
              ))}
            </div>
          </div>
          <div className={classes.screenInfo}>
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
                  onClick={() => handleQuestionClick(index)}
                >
                  {(index + 1).toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
        </div>

        {gameOver && <GameOver />}
        {false && (
          <div>
            <p>{score}</p>
            <button onClick={restartGame}>Restart Game</button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Assessment;
