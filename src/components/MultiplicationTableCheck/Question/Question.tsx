import React, { useEffect, useState } from 'react';
import classes from './Question.module.css'; // Import the CSS file for styling
import CustomButton from '../../Shared/CustomButton/CsutomButton';

interface QuestionProps {
  question: {
    num1: number;
    num2: number;
  };
  onAnswer: (answer: number) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  timeLeft: number;
  onStart: () => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  onAnswer,
  currentQuestionIndex,
  totalQuestions,
  timeLeft,
  onStart,
}) => {
  const [answer, setAnswer] = useState<string>('');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const { key } = e;

      if (key >= '0' && key <= '9') {
        setAnswer((prev) => prev + key);
      } else if (key === 'Enter') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handleSubmit(e as any); // Trigger submit on Enter
      } else if (key === 'Backspace') {
        setAnswer((prev) => prev.slice(0, -1));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnswer(parseInt(answer));
    setAnswer('');
  };

  const handleNumberClick = (number: number) => {
    setAnswer(answer + number);
  };

  const handleClear = () => {
    setAnswer('');
  };

  return (
    <div className={classes['container']}>
      <h2>Multiplication Table Check</h2>
      <div className={classes['question-container']}>
        <div className={classes['left-section']}>
          <h2>
            {question.num1} x {question.num2} =
          </h2>

          <div className={classes.question}>
            <p className={classes.label}>Question:</p>
            <div className={classes.flex}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
              >
                <path d='M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.145 7.961-9.91 7.961-1.937 0-3.383-.397-4.394-.644-1 .613-1.595 1.037-4.272 1.82.535-1.373.723-2.748.602-4.265-.838-1-2.025-2.4-2.025-4.872-.001-4.415 4.485-8.007 9.999-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.418.345 2.775.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006zm1.024 13.975c0 .566-.458 1.025-1.024 1.025-.565 0-1.024-.459-1.024-1.025 0-.565.459-1.024 1.024-1.024.566 0 1.024.459 1.024 1.024zm1.141-8.192c-.498-.505-1.241-.783-2.09-.783-1.786 0-2.941 1.271-2.941 3.237h1.647c0-1.217.68-1.649 1.261-1.649.519 0 1.07.345 1.117 1.004.052.694-.319 1.046-.788 1.493-1.157 1.1-1.179 1.633-1.173 2.842h1.643c-.01-.544.025-.986.766-1.785.555-.598 1.245-1.342 1.259-2.477.008-.758-.233-1.409-.701-1.882z' />
              </svg>
              <p>
                {currentQuestionIndex + 1}/{totalQuestions}
              </p>
            </div>
          </div>

          <div className={classes.timer}>
            <p className={classes.label}>Timer:</p>
            <div className={classes.flex}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
              >
                <path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z' />
              </svg>
              <p>00:0{timeLeft}</p>
            </div>
          </div>

          <div>
            <CustomButton onClick={onStart}>Start</CustomButton>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input type='number' value={answer} readOnly />
          <div className={classes['number-pad']}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                type='button'
                key={num}
                onClick={() => handleNumberClick(num)}
                className={classes['number-pad-key']}
              >
                {num}
              </button>
            ))}
            <button
              type='button'
              onClick={handleClear}
              className={classes['number-pad-key']}
            >
              Clear
            </button>
            <button
              type='button'
              onClick={() => handleNumberClick(0)}
              className={classes['number-pad-key']}
            >
              0
            </button>
            <button type='submit' className={classes['number-pad-key']}>
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Question;
