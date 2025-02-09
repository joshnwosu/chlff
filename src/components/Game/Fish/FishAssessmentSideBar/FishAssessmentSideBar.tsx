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
    <div style={{ marginTop: 40 }}>
      <ElementWrapper
        // title='Status'
        width={370}
        height={340}
        backgroundImage='/assets/elements/assessment_game_status-board.png'
      >
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
        <img
          src='/assets/elements/assessment_game_guide-2-alt.png'
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 0,
          }}
        />
        <div className={classes.instructionContent}>
          <h1>GUIDE</h1>
          <p>
            Swim to the correct answer by guiding the fish using your mouse pad.
          </p>
        </div>
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
    </div>
  );
};

export default FishAssessmentSideBar;
