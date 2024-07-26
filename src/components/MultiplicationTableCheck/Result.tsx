import React from 'react';

interface ResultProps {
  questions: {
    num1: number;
    num2: number;
  }[];
  answers: number[];
  onTryAgain: () => void;
}

const Result: React.FC<ResultProps> = ({ questions, answers, onTryAgain }) => {
  const score = questions.reduce((total, question, index) => {
    return total + (question.num1 * question.num2 === answers[index] ? 1 : 0);
  }, 0);

  return (
    <div>
      <h2>
        Your Score: {score} / {questions.length}
      </h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            {question.num1} x {question.num2} = {question.num1 * question.num2}(
            {answers[index] === question.num1 * question.num2
              ? 'Correct'
              : 'Wrong'}
            )
          </li>
        ))}
      </ul>
      <button onClick={onTryAgain}>Try Again</button>
    </div>
  );
};

export default Result;
