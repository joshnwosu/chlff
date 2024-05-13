import React, { useEffect, useState } from 'react';
import './MathGame.css';

interface Question {
  question: string;
  options: number[];
  answer: number;
}

function generateMultiplicationQuestion(): Question {
  const num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
  const num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
  const answer = num1 * num2; // Calculate the answer
  const options = [answer, Math.floor(Math.random() * 100)]; // Generate two options, one correct and one incorrect
  return {
    question: `${num1} * ${num2}`,
    options: options.sort(() => Math.random() - 0.5), // Shuffle options
    answer: answer,
  };
}

const MathGame: React.FC = () => {
  const [question, setQuestion] = useState<Question>(
    generateMultiplicationQuestion()
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [pausedTimeLeft, setPausedTimeLeft] = useState<number>(0);

  // For Pause and Play
  useEffect(() => {
    let timer: any;
    if (!isPaused) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIncorrectAnswers((prev) => prev + 1);
      resetQuestion();
    }
  }, [timeLeft]);
  // End for Pause and Play

  // No Pause and Play
  // useEffect(() => {
  //   if (timeLeft === 0) {
  //     setIncorrectAnswers((prev) => prev + 1);
  //     resetQuestion();
  //   } else {
  //     const timer = setInterval(() => {
  //       setTimeLeft((prevTime) => prevTime - 1);
  //     }, 1000);
  //     return () => clearInterval(timer);
  //   }
  // }, [timeLeft]);
  // End No Pause and Play

  const handleOptionClick = (option: number) => {
    if (selectedOption === null) {
      setSelectedOption(option);
      setShowCorrectAnswer(true);
      if (option === question.answer) {
        setCorrectAnswers((prev) => prev + 1);
      } else {
        setIncorrectAnswers((prev) => prev + 1);
      }
      setTimeout(() => {
        resetQuestion();
      }, 1000);
    }
  };

  const resetQuestion = () => {
    setSelectedOption(null);
    setShowCorrectAnswer(false);
    setTimeLeft(10); // Reset countdown timer
    setQuestion(generateMultiplicationQuestion());
  };

  const handlePauseClick = () => {
    setIsPaused(true);
    setPausedTimeLeft(timeLeft);
  };

  const handlePlayClick = () => {
    setIsPaused(false);
    setTimeLeft(pausedTimeLeft);
  };

  return (
    <div className='MathGame'>
      <h1>Multiplication Quiz</h1>
      <div className='question'>{question.question}</div>
      <div className='timer'>Time Left: {timeLeft} seconds</div>
      <div className='stats'>
        Correct Answers: {correctAnswers} | Incorrect Answers:{' '}
        {incorrectAnswers}
      </div>
      <div className='options'>
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`
              ${
                selectedOption !== null &&
                selectedOption === option &&
                option === question.answer
                  ? 'correct'
                  : ''
              }
              ${
                selectedOption !== null &&
                selectedOption === option &&
                option !== question.answer
                  ? 'incorrect'
                  : ''
              }
            `}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {showCorrectAnswer && <div className='answer'>{question.answer}</div>}
      <div className='controls'>
        <button onClick={handlePauseClick}>Pause</button>
        <button onClick={handlePlayClick}>Play</button>
      </div>
    </div>
  );
};

export default MathGame;
