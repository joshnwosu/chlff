import { useEffect, useState } from 'react';
import CustomButton from '../Shared/CustomButton/CsutomButton';
import './EntryLevel.css';
import { generateQuestions, Level, Question } from './data';

const EntryLevel: React.FC = () => {
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
        setTimer((prevTimer) => Math.max(prevTimer - 5, 0));
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
    <div className='container'>
      <h1>Year 2 Assessment Questions</h1>

      <div className='layout'>
        <div className='screen'>
          <div className='animation'>
            <div className='question'>
              <p>
                {`${(currentQuestionIndex + 1).toString().padStart(2, '0')})`}{' '}
                {questions[currentQuestionIndex].question}
              </p>
            </div>
          </div>
          <div className='options'>
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
        <div className='screen-info'>
          <div className='timer'>
            <div className='timer-label'>TIME</div>
            <div className='timer-counter'>
              <p className='counter'>{timer}</p>
              <p className='counter-label'>Seconds Left</p>
            </div>
          </div>
          <div className='question-list'>
            {questions.map((question, index) => (
              <div
                key={index}
                className={`question-item ${
                  currentQuestionIndex === index ? 'current' : ''
                }  ${question.isCorrect === true ? 'correct' : ''}
            ${question.isCorrect === false ? 'incorrect' : ''}`}
                onClick={() => handleQuestionClick(index)}
              >
                {(index + 1).toString().padStart(2, '0')}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryLevel;
