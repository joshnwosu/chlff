import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logout } from '../../../features/auth/authSlice';
import UserDataBanner from '../../Shared/UserDataBanner/UserDataBanner';
import { toggleLogoutConfirmModal } from '../../../features/control/controlSlice';
// import Overlay from '../../Shared/Overlay/Overlay';
// import CustomModalWrapper from '../../Shared/CustomModalWrapper/CustomModalWrapper';
// import { useState } from 'react';

interface Props {
  withBanner?: boolean;
}

const Header: React.FC<Props> = ({ withBanner = false }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const [showModal, setShowModal] = useState(false);

  const { user, loading } = useAppSelector((state) => state.user);

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
          <button onClick={goBback} style={{ width: 143.54 }}>
            <img
              className={classes.backArrow}
              src={`/assets/elements/back-arrow.png`}
            />
          </button>
        ) : (
          <div style={{ visibility: 'hidden', pointerEvents: 'none' }}>
            <CustomButton color='red' onClick={handleLogout}>
              Logout
            </CustomButton>
          </div>
        )}
      </div>

      {user && !loading && <>{withBanner && <UserDataBanner />}</>}

      <div>
        <CustomButton
          color='red'
          onClick={() => dispatch(toggleLogoutConfirmModal(true))}
        >
          Logout
        </CustomButton>
      </div>
    </div>
  );
};

export default Header;
