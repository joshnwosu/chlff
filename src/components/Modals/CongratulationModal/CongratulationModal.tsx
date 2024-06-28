import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleShowCongratulationModal } from '../../../features/control/controlSlice';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import Overlay from '../../Shared/Overlay/Overlay';
import classes from './CongratulationModal.module.css';

export default function CongratulationModal() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showCongratulationModal } = useAppSelector((state) => state.control);

  const handleClose = () => {
    dispatch(toggleShowCongratulationModal(!showCongratulationModal));
    navigate('/action-center');
  };

  return (
    <Overlay opened={showCongratulationModal} close={handleClose}>
      <div className={classes.flex}>
        <div className={classes.contentTop}>
          <h1 className={classes.title}>Congratulations!</h1>

          <div className={classes.column}>
            <div>
              <p>Your score</p>
              <h1>35/40</h1>
            </div>

            <div>
              <p>Welcome to</p>
              <h1>Year 2</h1>
            </div>
          </div>
        </div>

        <div className={classes.contentBottom}>
          <h2>Year 2 learning unlocked!</h2>
          <CustomButton onClick={handleClose}>Continue</CustomButton>
        </div>
      </div>
    </Overlay>
  );
}
