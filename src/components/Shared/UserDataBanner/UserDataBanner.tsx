import { useEffect } from 'react';
import { useAppSelector } from '../../../app/hooks';
import classes from './UserDataBanner.module.css';
import { useNavigate } from 'react-router-dom';

export default function UserDataBanner() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log('User: ', user);
  }, [user]);

  const handleNavigate = () => {
    navigate('/show-room');
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
          <div className={classes.frameMiddle} onClick={handleNavigate}></div>
          <div className={classes.frameRight}>
            <p className={classes.year}>Grade: 1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
