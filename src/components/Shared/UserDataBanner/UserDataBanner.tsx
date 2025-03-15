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
import { renderAvatar } from '../../../utils/renderAvatar';

export default function UserDataBanner() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);
  const { noAvatarMoal, selectedYear } = useAppSelector(
    (state) => state.control
  );

  useEffect(() => {
    if (user && location.pathname !== '/assessment') {
      // console.log('User: ', user);
      renderAvatar(user.gender, user.skin, user.character);
    }
  }, [user, dispatch, location]);

  const handleNavigate = () => {
    if (location.pathname === '/assessment') {
      dispatch(toggleShowNoAvatarModal(true));
    } else {
      dispatch(toggleSelectGenderModal(true));
    }
  };

  // useEffect(() => {
  //   console.log('NA ME: ', user);
  // }, []);

  return (
    <div className={classes.container}>
      <div className={classes.frame}>
        <img
          src='/assets/elements/user_details_banner.png'
          className={classes.frameImage}
        />
        <div className={classes.frameFlex}>
          <div className={classes.frameLeft}>
            {/* <p className={classes.name}>{user?.displayName}</p> */}
            <div className={classes.levelFlex}>
              <p className={classes.level}>Name:</p>
              <p className={classes.levelValue}>{user?.displayName}</p>
            </div>
            {/* {user?.level && <p className={classes.name}>Level: 1</p>} */}
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
            <div className={classes.levelFlex}>
              <p className={classes.level}>Grade:</p>
              <p className={classes.levelValue}>Year {selectedYear}</p>
            </div>
          </div>
        </div>
      </div>

      <Overlay opened={noAvatarMoal}>
        <CustomModalWrapper title='Please complete your assessment test first!'>
          <CustomButton
            onClick={() => dispatch(toggleShowNoAvatarModal(false))}
          >
            Close
          </CustomButton>
        </CustomModalWrapper>
      </Overlay>
    </div>
  );
}
