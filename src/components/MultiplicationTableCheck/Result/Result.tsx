import React from 'react';
import { motion } from 'framer-motion';
import classes from './Result.module.css';
import CustomButton from '../../Shared/CustomButton/CsutomButton';

interface ResultProps {
  questions: {
    num1: number;
    num2: number;
  }[];
  answers: number[];
  onTryAgain: () => void;
}

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const variants2 = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Result: React.FC<ResultProps> = ({ questions, answers, onTryAgain }) => {
  const score = questions.reduce((total, question, index) => {
    return total + (question.num1 * question.num2 === answers[index] ? 1 : 0);
  }, 0);

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>
        Your Score: {score} / {questions.length}
      </h2>
      <div className={classes.result}>
        <motion.ul variants={variants2} className={classes.list_container}>
          {questions.map((question, index) => (
            <motion.li
              variants={variants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              key={index}
              className={classes.list}
            >
              <p>
                {`${index + 1}.) ${question.num1} x ${question.num2} = `}
                {question.num1 * question.num2}
              </p>
              <p>
                (
                {answers[index] === question.num1 * question.num2
                  ? 'Correct'
                  : 'Wrong'}
                )
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <div className={classes.btnWrap}>
        <CustomButton onClick={onTryAgain}>Try Again</CustomButton>
      </div>
    </div>
  );
};

export default Result;
