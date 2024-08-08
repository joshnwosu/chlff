import classes from './StartGame.module.css';
import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { toggleAssessmentYearModal } from '../../features/control/controlSlice';
import VolumeIcon from '../../icons/VolumeIcon';
import SettingsIcon from '../../icons/SettingsIcon';
import useSound from '../../utils/useSound';
import { toggleSound } from '../../features/sound/soundSlice';

const StartGame: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleStart = () => {
    dispatch(toggleAssessmentYearModal(true));
  };

  const handleSettingsClick = () => {
    navigate('/show-room');
  };

  useSound('/sound/background2.mp3');

  return (
    <div className={classes.start_game}>
      <h3>Ready for your Assessment Test?</h3>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <CustomButton onClick={handleStart}>START NOW</CustomButton>

        {true && (
          <Link to={'/action-center'}>
            <CustomButton>ACTION CENTER</CustomButton>
          </Link>
        )}

        {true && (
          <Link to={'/game'}>
            <CustomButton>CAR</CustomButton>
          </Link>
        )}

        {true && (
          <Link to={'/assessment'}>
            <CustomButton>ASSESSMENT</CustomButton>
          </Link>
        )}
      </div>
      <div className={classes.bottom}>
        <button className={classes.btn} onClick={handleSettingsClick}>
          <SettingsIcon size={30} color='#ffffff' />
        </button>

        <button className={classes.btn} onClick={() => dispatch(toggleSound())}>
          <VolumeIcon size={30} color='#ffffff' />
        </button>
      </div>
    </div>
  );
};

export default StartGame;
