import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import classes from './UserDataBanner.module.css';
import {
  toggleSelectGenderModal,
  toggleShowNoAvatarModal,
} from '../../../features/control/controlSlice';
import { useLocation } from 'react-router-dom';
import Overlay from '../Overlay/Overlay';
import CustomButton from '../CustomButton/CsutomButton';
import CustomModalWrapper from '../CustomModalWrapper/CustomModalWrapper';

const imagePath = '/assets/showroom/avatar';

export default function UserDataBanner() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);
  const { noAvatarMoal } = useAppSelector((state) => state.control);

  useEffect(() => {
    if (user) {
      console.log('User: ', user);
      renderAvatar(user.gender, user.skin, user.character);
    }
  }, [user, dispatch]);

  const handleNavigate = () => {
    if (location.pathname === '/assessment') {
      dispatch(toggleShowNoAvatarModal(true));
    } else {
      dispatch(toggleSelectGenderModal(true));
    }
  };

  const renderAvatar = (
    gender: string,
    skin: string,
    character: string
  ): string => {
    // Determine the prefix based on gender and skin
    let prefix = '';
    if (gender === 'boy') {
      prefix = skin === 'black' ? 'bb' : 'wb'; // bb = black boy, wb = white boy
    } else if (gender === 'girl') {
      prefix = skin === 'black' ? 'bg' : 'wg'; // bg = black girl, wg = white girl
    }

    // Combine the prefix with the character name
    return `${imagePath}/${character.toLowerCase()}-${prefix}.jpg`;
  };

  return (
    <div className={classes.container}>
      <div className={classes.frame}>
        <img
          src='/assets/elements/user_details_banner.png'
          className={classes.frameImage}
        />
        <div className={classes.frameFlex}>
          <div className={classes.frameLeft}>
            <p className={classes.name}>{user?.displayName}</p>
            <p className={classes.name}>Level: 1</p>
          </div>
          <div className={classes.frameMiddle} onClick={handleNavigate}>
            {user?.gender && user.skin && user.character ? (
              <img
                src={`${renderAvatar(user.gender, user.skin, user.character)}`}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            ) : (
              <img
                src='/assets/elements/choose-your-avatar.png'
                className={classes.frameChoseeAvatar}
              />
            )}
          </div>
          <div className={classes.frameRight}>
            <p className={classes.year}>Grade: 1</p>
          </div>
        </div>
      </div>

      <Overlay opened={noAvatarMoal}>
        <CustomModalWrapper>
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: 20,
            }}
          >
            <p
              style={{
                color: 'white',
                textAlign: 'center',
                marginBottom: 20,
                fontSize: 28,
                fontFamily: 'Sigmar One',
                WebkitTextStroke: '1px black',
                textTransform: 'uppercase',
              }}
            >
              Please complete your assessment test first!
            </p>
            <CustomButton
              onClick={() => dispatch(toggleShowNoAvatarModal(false))}
            >
              Close
            </CustomButton>
          </div>
        </CustomModalWrapper>
      </Overlay>
    </div>
  );
}
