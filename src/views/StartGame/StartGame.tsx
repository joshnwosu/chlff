import classes from './StartGame.module.css';
import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { toggleAssessmentYearModal } from '../../features/control/controlSlice';
import VolumeIcon from '../../icons/VolumeIcon';
import SettingsIcon from '../../icons/SettingsIcon';
import { toggleSound } from '../../features/sound/soundSlice';
// import { useEffect } from 'react';
// import { soundPlayer } from '../../utils/sound';

const StartGame: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleStart = () => {
    dispatch(toggleAssessmentYearModal(true));
  };

  const handleSettingsClick = () => {
    navigate('/show-room');
  };

  // useEffect(() => {
  //   soundPlayer.playSound('startgame');

  //   soundPlayer.stopSound('underwater');
  //   soundPlayer.stopSound('backgroundfish');
  //   soundPlayer.stopSound('carbackground');
  // }, []);

  return (
    <div className={classes.start_game}>
      {/* <audio src='/sound/background.mp3' autoPlay></audio> */}
      <h3>Ready for your Assessment Test?</h3>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <CustomButton onClick={handleStart}>START NOW</CustomButton>

        {true && (
          <Link to={'/action-center'}>
            <CustomButton>ACTION CENTER</CustomButton>
          </Link>
        )}

        {true && (
          <Link to={'/picture-puzzle'}>
            <CustomButton>PICTURE PUZZLE</CustomButton>
          </Link>
        )}

        {true && (
          <Link to={'/car-race-two'}>
            <CustomButton>CAR RACE</CustomButton>
          </Link>
        )}

        {false && (
          <Link to={'/game'}>
            <CustomButton>CAR</CustomButton>
          </Link>
        )}

        {false && (
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
