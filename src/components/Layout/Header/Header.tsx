import { useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/auth/authSlice';
import UserDataBanner from '../../Shared/UserDataBanner/UserDataBanner';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goBback = async () => {
    navigate(-1);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Check if the current path matches the specified routes
  const showUserDataBanner =
    location.pathname === '/' || location.pathname === '/assessment';

  return (
    <div className={classes.header}>
      <div>
        {true && (
          <>
            <button onClick={goBback}>
              <img
                className={classes.backArrow}
                src={`/assets/elements/back-arrow.png`}
              />
            </button>
          </>
        )}
      </div>

      {showUserDataBanner && <UserDataBanner />}

      <div>
        <CustomButton color='red' onClick={handleLogout}>
          Exit
        </CustomButton>
      </div>
    </div>
  );
};

export default Header;
