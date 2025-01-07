import classes from '../Fish.module.css';
import { useNavigate } from 'react-router-dom';
import Overlay from '../../../Shared/Overlay/Overlay';
import CustomButton from '../../../Shared/CustomButton/CsutomButton';
import ElementWrapper from '../../../Shared/ElementWrapper/ElementWrapper';

interface GameOverProps {
  selected_year: number;
  score: number;
  total_questions: number;
  visible: boolean;
  strengthLevel: string;
  handleReplayGame: () => void;
  showGameOverModal: boolean;
}

const FishAssessmentGameOver = ({
  selected_year,
  score,
  total_questions,
  visible,
  strengthLevel,
  handleReplayGame,
  showGameOverModal,
}: GameOverProps) => {
  const navigate = useNavigate();

  const handleClose = () => {
    console.log('close...');
    navigate('/action-center');
  };

  return (
    <>
      {false && (
        <>
          {strengthLevel === 'Failed' ? (
            <Overlay
              opened={showGameOverModal}
              close={() => {
                handleReplayGame();
              }}
              color='#FFB200'
            >
              <div className={classes.failed}>
                <h1>FAILED!</h1>
                <div>
                  <CustomButton onClick={handleReplayGame}>Replay</CustomButton>
                </div>
              </div>
            </Overlay>
          ) : (
            <Overlay opened={visible} close={handleClose} color='#FFB200'>
              <div className={classes.gameOver}>
                <div className={classes.gameOverHeader}>
                  <h1 className={classes.gameOverTitle}>Congratulations!</h1>
                  <p>{strengthLevel}</p>
                </div>

                <div className={classes.gameOverColumn}>
                  <div>
                    <p className={classes.gameOverLabel}>Your score</p>
                    <p className={classes.gameOverValue}>
                      {score}/{total_questions}
                    </p>
                  </div>

                  <div>
                    <p className={classes.gameOverLabel}>Welcome to</p>
                    <p className={classes.gameOverValue}>
                      Year {selected_year}
                    </p>
                  </div>
                </div>

                <div className={classes.gameOverBottom}>
                  <h2>Year {selected_year} learning unlocked!</h2>
                  <div>
                    <CustomButton onClick={handleClose}>Continue</CustomButton>
                  </div>
                </div>
              </div>
            </Overlay>
          )}
        </>
      )}

      <div
        style={{
          width: '100%',
          height: '100%',
          // backgroundColor: 'red',
          position: 'absolute',
          zIndex: 999,
          top: 0,
          left: 0,
          backgroundImage: 'url(assets/background/spark.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ElementWrapper title='CONGRATULATION' width={400} height={400}>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              // border: '1px solid red',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span>Your score:</span>
                <span
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: '#010628',
                  }}
                >
                  {score}/{total_questions}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span>Level Unlocked</span>
                <span
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: '#010628',
                  }}
                >
                  {strengthLevel}
                </span>
              </div>

              <div
                style={{
                  marginBottom: 20,
                  backgroundColor: '#010628',
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <h1
                  style={{ color: 'yellow', fontSize: 24, textAlign: 'center' }}
                >
                  Welcome to Year {selected_year}
                </h1>
              </div>

              <CustomButton onClick={handleClose}>Continue</CustomButton>
            </div>
          </div>
        </ElementWrapper>
      </div>
    </>
  );
};

export default FishAssessmentGameOver;
