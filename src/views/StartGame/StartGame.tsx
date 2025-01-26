import classes from './StartGame.module.css';
import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleSelectGenderModal } from '../../features/control/controlSlice';
import VolumeIcon from '../../icons/VolumeIcon';
import SettingsIcon from '../../icons/SettingsIcon';
import { toggleSound } from '../../features/sound/soundSlice';
import { useEffect } from 'react';
import { soundPlayer } from '../../utils/sound';
// import { getUserProfile } from '../../features/user/userSlice';

const StartGame: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const handleStart = () => {
    navigate('/ready-game');
    // dispatch(toggleSelectGenderModal(true));
  };

  const handleGender = () => {
    dispatch(toggleSelectGenderModal(true));
  };

  const handleSettingsClick = () => {
    navigate('/show-room');
  };

  useEffect(() => {
    const playSound = false;

    if (playSound) {
      soundPlayer.playSound('startgame');

      soundPlayer.stopSound('underwater');
      soundPlayer.stopSound('backgroundfish');
      soundPlayer.stopSound('carbackground');
      soundPlayer.stopSound('driving');
    }
  }, [navigate]);

  // useEffect(() => {
  //   dispatch(getUserProfile())
  //     .unwrap()
  //     .then((res) => {
  //       console.log('The Res: ', res);
  //     });
  // }, [dispatch]);

  return (
    <div className={classes.container}>
      <audio src='/sound/background.mp3' autoPlay></audio>

      {true && (
        <>
          {false && <h4>Hi, {user?.displayName}</h4>}
          <h3>Ready for your Assessment Test?</h3>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
            <CustomButton onClick={handleStart}>START</CustomButton>

            {false && (
              <CustomButton onClick={handleGender}>CHARACTER</CustomButton>
            )}

            {false && (
              <Link to={'/action-center'}>
                <CustomButton>GAME</CustomButton>
              </Link>
            )}

            {false && (
              <Link to={'/picture-puzzle'}>
                <CustomButton>PICTURE PUZZLE</CustomButton>
              </Link>
            )}

            {false && (
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

            {false && (
              <Link to={'/level'}>
                <CustomButton>LEVEL</CustomButton>
              </Link>
            )}
          </div>
          <div className={classes.bottom}>
            <button className={classes.btn} onClick={handleSettingsClick}>
              <SettingsIcon size={30} color='#ffffff' />
            </button>

            <button
              className={classes.btn}
              onClick={() => dispatch(toggleSound())}
            >
              <VolumeIcon size={30} color='#ffffff' />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StartGame;
