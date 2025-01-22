import classes from '../Fish.module.css';
import { useNavigate } from 'react-router-dom';
import Overlay from '../../../Shared/Overlay/Overlay';
import CustomButton from '../../../Shared/CustomButton/CsutomButton';
import ElementWrapper from '../../../Shared/ElementWrapper/ElementWrapper';

interface GameOverProps {
  selected_year: number;
  score: number;
  total_questions: number;
  strengthLevel: string;
  handleReplayGame: () => void;
  showGameOverModal: boolean;
}

const FishAssessmentGameOver = ({
  selected_year,
  score,
  total_questions,
  strengthLevel,
  handleReplayGame,
  showGameOverModal,
}: GameOverProps) => {
  const navigate = useNavigate();

  const handleClose = () => {
    // console.log('close...');
    navigate('/pick-a-year');
  };

  const handleContinue = () => {
    navigate('/action-center');
  };

  return (
    <>
      {strengthLevel === 'Failed' ? (
        <Overlay
          opened={showGameOverModal}
          close={handleClose}
          color='#F52D0090'
        >
          <div className={classes.gameOver}>
            <div className={classes.gameOverBottom}>
              <h2>Assessment not passed!</h2>

              <div
                style={{
                  display: 'flex',
                  gap: 20,
                }}
              >
                <div>
                  <CustomButton onClick={handleReplayGame}>
                    Try Again
                  </CustomButton>
                </div>

                <div>
                  <CustomButton color='red' onClick={handleClose}>
                    Exit
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </Overlay>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            // backgroundColor: 'red',
            position: 'absolute',
            zIndex: 999,
            top: 0,
            left: 0,
            backgroundImage:
              'url(assets/background/congratulations_on_assessment-BG.jpg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ElementWrapper
            // title='CONGRATULATION'
            width={500}
            height={300}
            backgroundImage='/assets/elements/congratulations_on_assessment-BOARD.png'
          >
            <div
              style={{
                // position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // border: '1px solid red',
              }}
            >
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                    }}
                  >
                    Your score:
                  </span>
                  <span
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: '#010628',
                      fontSize: 24,
                      color: 'yellow',
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
                  <span
                    style={{
                      fontFamily: 'Sigmar One',
                      fontSize: 24,
                    }}
                  >
                    Level Unlocked:
                  </span>
                  <span
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: '#010628',
                      fontFamily: 'Sigmar One',
                      fontSize: 24,
                      color: 'yellow',
                    }}
                  >
                    {strengthLevel || 'None'}
                  </span>
                </div>

                <div
                  style={{
                    marginBottom: 20,
                    backgroundColor: '#01062850',
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <h1
                    style={{
                      color: 'yellow',
                      fontSize: 24,
                      textAlign: 'center',
                    }}
                  >
                    Welcome to Year {selected_year}
                  </h1>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: -10,
                    left: 0,
                    // border: '1px solid red',
                    width: '100%',

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <CustomButton onClick={handleContinue}>
                      Continue
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>
          </ElementWrapper>
        </div>
      )}
    </>
  );
};

export default FishAssessmentGameOver;
