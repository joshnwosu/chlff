import React, { useEffect, useState } from 'react';
import './Assessment.css';

enum Level {
  PRIMARY_1 = 'PRIMARY_1',
  PRIMARY_2 = 'PRIMARY_2',
  PRIMARY_3 = 'PRIMARY_3',
}

interface Question {
  question: string;
  options: string[];
  answer: string;
  isCorrect?: boolean;
}

const generateQuestions = (level: Level): Question[] => {
  switch (level) {
    case Level.PRIMARY_1:
      return [
        {
          question: "My father's brother is my _______",
          options: ['Father', 'Uncle', 'Brother', 'Cousin'],
          answer: 'Uncle',
        },
        {
          question: 'What color is the sky?',
          options: ['Blue', 'Red', 'Green', 'Yellow'],
          answer: 'Blue',
        },
        {
          question: 'How many legs does a cat have?',
          options: ['Two', 'Four', 'Six', 'Eight'],
          answer: 'Four',
        },
        {
          question: 'What comes after Monday?',
          options: ['Wednesday', 'Friday', 'Saturday', 'Tuesday'],
          answer: 'Tuesday',
        },
        {
          question: 'What is the capital of France?',
          options: ['Paris', 'London', 'Berlin', 'Rome'],
          answer: 'Paris',
        },
        {
          question: "What is the opposite of 'hot'?",
          options: ['Cold', 'Warm', 'Freezing', 'Boiling'],
          answer: 'Cold',
        },
        {
          question: 'How many continents are there?',
          options: ['Five', 'Six', 'Seven', 'Eight'],
          answer: 'Seven',
        },
        {
          question: 'What do you use to write?',
          options: ['Pencil', 'Knife', 'Spoon', 'Fork'],
          answer: 'Pencil',
        },
        {
          question: "What animal says 'meow'?",
          options: ['Dog', 'Cat', 'Cow', 'Sheep'],
          answer: 'Cat',
        },
        {
          question: "What is the opposite of 'big'?",
          options: ['Small', 'Large', 'Huge', 'Giant'],
          answer: 'Small',
        },
      ];

    default:
      return [];
  }
};

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
  const [gameActive, setGameActive] = useState<boolean>(true);

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
      console.log('Quiz finished');
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

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <div className='Assessment'>
      <div className='timer'>Time Left: {timer} seconds</div>
      <h1>Primary 1 Questions Quiz</h1>
      <div className='questions-list'>
        {questions.map((question, index) => (
          <button
            key={index}
            className={`question-item ${
              currentQuestionIndex === index ? 'current' : ''
            }  ${question.isCorrect === true ? 'correct' : ''}
            ${question.isCorrect === false ? 'incorrect' : ''}`}
            onClick={() => handleQuestionClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {/* <br /> */}
      <div className='assessment-question'>
        {questions[currentQuestionIndex].question}
      </div>
      <div className='assessment-options'>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <button key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </button>
        ))}
      </div>

      {gameOver && (
        <div className='score'>
          <h2>Game Over</h2>
          <p>
            Your Score: {score} / {questions.length}
          </p>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default Assessment;
