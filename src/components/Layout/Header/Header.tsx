import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/auth/authSlice';
import UserDataBanner from '../../Shared/UserDataBanner/UserDataBanner';

interface Props {
  withBanner?: boolean;
}

const Header: React.FC<Props> = ({ withBanner = false }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const goBback = async () => {
    navigate(-1);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={classes.header}>
      <div>
        {!['/', '/action-center'].includes(location.pathname) ? (
          <button onClick={goBback}>
            <img
              className={classes.backArrow}
              src={`/assets/elements/back-arrow.png`}
            />
          </button>
        ) : (
          <div style={{ visibility: 'hidden', pointerEvents: 'none' }}>
            <CustomButton color='red' onClick={handleLogout}>
              Exit
            </CustomButton>
          </div>
        )}
      </div>

      {withBanner && <UserDataBanner />}

      <div>
        <CustomButton color='red' onClick={handleLogout}>
          Exit
        </CustomButton>
      </div>
    </div>
  );
};

export default Header;
