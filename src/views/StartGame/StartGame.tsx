import classes from './StartGame.module.css';
import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { toggleAssessmentYearModal } from '../../features/control/controlSlice';

const StartGame: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleStart = () => {
    dispatch(toggleAssessmentYearModal(true));
  };

  return (
    <div className={classes.start_game}>
      <h3>Ready for your Assessment Test?</h3>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <CustomButton onClick={handleStart}>START NOW</CustomButton>

        <Link to={'/action-center'}>
          <CustomButton>ACTION CENTER</CustomButton>
        </Link>

        <Link to={'/show-room'}>
          <CustomButton>SHOW ROOM</CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default StartGame;
