import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleShowCongratulationModal } from '../../../features/control/controlSlice';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import Overlay from '../../Shared/Overlay/Overlay';
import classes from './CongratulationModal.module.css';
import { useEffect } from 'react';

export default function CongratulationModal() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showCongratulationModal, selectedYear, playerScore } = useAppSelector(
    (state) => state.control
  );

  const handleClose = () => {
    dispatch(toggleShowCongratulationModal(!showCongratulationModal));
    navigate('/action-center');
  };

  useEffect(() => {
    console.log('Player score: ', playerScore);
  }, [playerScore]);

  return (
    <Overlay opened={showCongratulationModal} close={handleClose}>
      <div className={classes.flex}>
        <div className={classes.contentTop}>
          <h1 className={classes.title}>Congratulations!</h1>

          <div className={classes.column}>
            <div>
              <p>Your score</p>
              <h1>
                {playerScore.correct_questions}/{playerScore.total_questions}
              </h1>
            </div>

            <div>
              <p>Welcome to</p>
              <h1>Year {selectedYear}</h1>
            </div>
          </div>
        </div>

        <div className={classes.contentBottom}>
          <h2>Year {selectedYear} learning unlocked!</h2>
          <CustomButton onClick={handleClose}>Continue</CustomButton>
        </div>
      </div>
    </Overlay>
  );
}
