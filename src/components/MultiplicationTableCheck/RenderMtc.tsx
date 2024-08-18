// import React, { useEffect, useState } from 'react';
// import Question from './Question/Question';
// import Result from './Result/Result';

// interface QuestionType {
//   num1: number;
//   num2: number;
// }

// const generateQuestions = (): QuestionType[] => {
//   const questions: QuestionType[] = [];
//   for (let i = 0; i < 26; i++) {
//     const num1 = Math.floor(Math.random() * 12) + 1;
//     const num2 = Math.floor(Math.random() * 12) + 1;
//     questions.push({ num1, num2 });
//   }
//   return questions;
// };

// const RenderMtc: React.FC = () => {
//   const [questions, setQuestions] = useState<QuestionType[]>(
//     generateQuestions()
//   );
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
//   const [answers, setAnswers] = useState<number[]>([]);
//   const [showResult, setShowResult] = useState<boolean>(false);
//   const [timeLeft, setTimeLeft] = useState<number>(6);

//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timer = setTimeout(() => {
//         setTimeLeft(timeLeft - 1);
//       }, 1000);
//       return () => clearTimeout(timer);
//     } else {
//       handleTimeout();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [timeLeft]);

//   useEffect(() => {
//     setTimeLeft(6);
//   }, [currentQuestionIndex]);

//   const handleTimeout = () => {
//     setAnswers([...answers, NaN]); // NaN indicates no answer given
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       setShowResult(true);
//     }
//   };

//   const handleAnswer = (answer: number) => {
//     setAnswers([...answers, answer]);
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       setShowResult(true);
//     }
//   };

//   const handleTryAgain = () => {
//     setQuestions(generateQuestions());
//     setCurrentQuestionIndex(0);
//     setAnswers([]);
//     setShowResult(false);
//   };

//   const handleStart = () => {};

//   return (
//     <div className='App'>
//       {!showResult ? (
//         <Question
//           question={questions[currentQuestionIndex]}
//           onAnswer={handleAnswer}
//           currentQuestionIndex={currentQuestionIndex}
//           totalQuestions={questions.length}
//           timeLeft={timeLeft}
//           onStart={handleStart}
//         />
//       ) : (
//         <Result
//           questions={questions}
//           answers={answers}
//           onTryAgain={handleTryAgain}
//         />
//       )}
//     </div>
//   );
// };

// export default RenderMtc;

import React, { useEffect, useState } from 'react';
import Question from './Question/Question';
import Result from './Result/Result';
import CustomButton from '../Shared/CustomButton/CsutomButton';

interface QuestionType {
  num1: number;
  num2: number;
}

const generateQuestions = (): QuestionType[] => {
  const questions: QuestionType[] = [];
  for (let i = 0; i < 26; i++) {
    const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    questions.push({ num1, num2 });
  }
  return questions;
};

const RenderMtc: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>(
    generateQuestions()
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(6);
  const [gameStarted, setGameStarted] = useState<boolean>(false); // New state for game start

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleTimeout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      setTimeLeft(6);
    }
  }, [currentQuestionIndex, gameStarted]);

  const handleTimeout = () => {
    setAnswers([...answers, NaN]); // NaN indicates no answer given
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleAnswer = (answer: number) => {
    setAnswers([...answers, answer]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleTryAgain = () => {
    setQuestions(generateQuestions());
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResult(false);
    setGameStarted(false); // Reset game start state
  };

  const handleStart = () => {
    setGameStarted(true); // Start the game
  };

  return (
    <div className='App'>
      {!showResult ? (
        gameStarted ? (
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            timeLeft={timeLeft}
          />
        ) : (
          <CustomButton onClick={handleStart}>Start Test</CustomButton>
        )
      ) : (
        <Result
          questions={questions}
          answers={answers}
          onTryAgain={handleTryAgain}
        />
      )}
    </div>
  );
};

export default RenderMtc;
