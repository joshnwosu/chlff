import classes from './FishInGame.module.css';
import { Question } from '../../../data/data';

interface Props {
  questions: Question[];
  currentQuestionIndex: number;
}

export default function FishQuestions({
  questions = [],
  currentQuestionIndex,
}: Props) {
  return (
    <div className={classes.questionList}>
      {questions.map((question, index) => (
        <div
          key={index}
          className={`${classes.questionItem} ${
            currentQuestionIndex === index ? classes.current : ''
          } ${question.isCorrect === true ? classes.correct : ''} ${
            question.isCorrect === false ? classes.incorrect : ''
          }`}
          onClick={() => console.log(questions[currentQuestionIndex!])}
        >
          {(index + 1).toString().padStart(2, '0')}
        </div>
      ))}
    </div>
  );
}
