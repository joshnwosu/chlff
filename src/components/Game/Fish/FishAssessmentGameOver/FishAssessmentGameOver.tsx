import classes from '../Fish.module.css';
import { useNavigate } from 'react-router-dom';
import Overlay from '../../../Shared/Overlay/Overlay';
import CustomButton from '../../../Shared/CustomButton/CsutomButton';

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
      {strengthLevel === 'No Level' ? (
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
                <p className={classes.gameOverValue}>Year {selected_year}</p>
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
  );
};

export default FishAssessmentGameOver;
