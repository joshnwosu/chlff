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
import { getUserProfile } from '../../features/user/userSlice';
import ElementWrapper from '../../components/Shared/ElementWrapper/ElementWrapper';
import { logout } from '../../features/auth/authSlice';

// Preview branch commit.

const StartGame: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const handleStart = () => {
    // dispatch(toggleAssessmentYearModal(true));
    navigate('/pick-a-year');
  };

  const handleSettingsClick = () => {
    navigate('/show-room');
  };

  useEffect(() => {
    // soundPlayer.playSound('startgame');

    soundPlayer.stopSound('underwater');
    soundPlayer.stopSound('backgroundfish');
    soundPlayer.stopSound('carbackground');
    soundPlayer.stopSound('driving');
  }, [navigate]);

  useEffect(() => {
    dispatch(getUserProfile())
      .unwrap()
      .then((res) => {
        console.log('The Res: ', res);
      });
  }, [dispatch]);

  const handleGender = () => {
    dispatch(toggleSelectGenderModal(true));
  };

  const handleNo = async () => {
    dispatch(logout());
  };

  return (
    <div className={classes.start_game}>
      <audio src='/sound/background.mp3' autoPlay></audio>

      <ElementWrapper height={380} title='WELCOME'>
        <div
          style={{
            flex: 1,
            backgroundColor: 'darkblue',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 10,
            boxShadow: '1px 10px 20px rgba(0,0,0,0.5) inset',
            padding: 20,
          }}
        >
          <p
            style={{
              color: 'yellow',
              fontSize: 24,
            }}
          >
            Are you ready for your Assessment Test?
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <CustomButton onClick={handleStart}>YES</CustomButton>
          <CustomButton color='red' onClick={handleNo}>
            NO
          </CustomButton>
        </div>
      </ElementWrapper>

      {false && (
        <>
          <h4>Hi, {user?.displayName}</h4>
          <h3>Ready for your Assessment Test?</h3>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
            <CustomButton onClick={handleStart}>START</CustomButton>

            {true && (
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

            {true && (
              <CustomButton onClick={handleGender}>CHARACTER</CustomButton>
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
