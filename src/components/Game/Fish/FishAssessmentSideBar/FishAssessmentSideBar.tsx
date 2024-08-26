import classes from '../Fish.module.css';
import { FishSideBarProps } from '../../../../interfaces/fish';
import UserDetail from '../../../Shared/UserDetail/UserDetail';

const FishAssessmentSideBar = ({
  questions,
  currentQuestionIndex,
  timer,
}: FishSideBarProps) => {
  return (
    <div className={classes.screenInfo}>
      <UserDetail showLevel={false} mode='dark' level={5} />

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
            onClick={() => console.log(questions[currentQuestionIndex!])}
          >
            {(index + 1).toString().padStart(2, '0')}
          </div>
        ))}
      </div>

      <div className={classes.instruction}>
        <h1>Instructions</h1>
        <p>
          Swim to the correct answer by guiding the fish using your mouse pad.
        </p>
      </div>
    </div>
  );
};

export default FishAssessmentSideBar;
