import classes from '../Fish.module.css';
import { FishSideBarProps } from '../../../../interfaces/fish';
import UserDetail from '../../../Shared/UserDetail/UserDetail';
import ElementWrapper from '../../../Shared/ElementWrapper/ElementWrapper';

const FishAssessmentSideBar = ({
  questions,
  currentQuestionIndex,
  timer,
}: FishSideBarProps) => {
  return (
    <>
      <ElementWrapper title='Status' width={370} height={360}>
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
      </ElementWrapper>

      <div className={classes.instruction}>
        <h1>GUIDE</h1>
        <p>
          Swim to the correct answer by guiding the fish using your mouse pad.
        </p>
      </div>

      {false && (
        <div className={classes.screenInfo}>
          <UserDetail showLevel={false} mode='dark' level={5} />

          <div className={classes.timer}>
            <div className={classes.timerLabel}>TIME</div>
            <div className={classes.timerCounter}>
              <p className={classes.counter}>{timer}</p>
              <p className={classes.counterLabel}>Seconds Left</p>
            </div>
          </div>

          <ElementWrapper title='Status' width={400} height={500}>
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
          </ElementWrapper>

          <div className={classes.instruction}>
            <h1>Instructions</h1>
            <p>
              Swim to the correct answer by guiding the fish using your mouse
              pad.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FishAssessmentSideBar;
