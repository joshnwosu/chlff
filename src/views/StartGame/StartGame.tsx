import classes from './StartGame.module.css';
import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { toggleAssessmentYearModal } from '../../features/control/controlSlice';
import VolumeIcon from '../../icons/VolumeIcon';
import SettingsIcon from '../../icons/SettingsIcon';

const StartGame: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleStart = () => {
    dispatch(toggleAssessmentYearModal(true));
  };

  const handleSettingsClick = () => {
    navigate('/show-room');
  };

  return (
    <div className={classes.start_game}>
      <audio src='/sound/background2.mp3' autoPlay loop></audio>
      <h3>Ready for your Assessment Test?</h3>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <CustomButton onClick={handleStart}>START NOW</CustomButton>

        <Link to={'/action-center'}>
          <CustomButton>ACTION CENTER</CustomButton>
        </Link>

        {/* <Link to={'/game'}>
          <CustomButton>CAR</CustomButton>
        </Link> */}
      </div>
      <div className={classes.bottom}>
        <button className={classes.btn} onClick={handleSettingsClick}>
          <SettingsIcon size={30} color='#ffffff' />
        </button>
        <button className={classes.btn}>
          <VolumeIcon size={30} color='#ffffff' />
        </button>
      </div>
    </div>
  );
};

export default StartGame;
