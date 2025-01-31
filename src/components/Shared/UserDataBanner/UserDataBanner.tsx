import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import classes from './UserDataBanner.module.css';
import { toggleSelectGenderModal } from '../../../features/control/controlSlice';

export default function UserDataBanner() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log('User: ', user);
  }, [user]);

  const handleNavigate = () => {
    dispatch(toggleSelectGenderModal(true));
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
            <img
              src='/assets/elements/choose-your-avatar.png'
              className={classes.frameChoseeAvatar}
            />
          </div>
          <div className={classes.frameRight}>
            <p className={classes.year}>Grade: 1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
