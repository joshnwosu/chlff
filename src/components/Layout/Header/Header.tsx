import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/auth/authSlice';
import UserDataBanner from '../../Shared/UserDataBanner/UserDataBanner';
import Overlay from '../../Shared/Overlay/Overlay';
import CustomModalWrapper from '../../Shared/CustomModalWrapper/CustomModalWrapper';
import { useState } from 'react';

interface Props {
  withBanner?: boolean;
}

const Header: React.FC<Props> = ({ withBanner = false }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

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
        <CustomButton color='red' onClick={() => setShowModal(true)}>
          Logout
        </CustomButton>
      </div>

      <Overlay opened={showModal}>
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
              Do you want to logout?{' '}
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div>
                <CustomButton color='red' onClick={handleLogout}>
                  Yes
                </CustomButton>
              </div>
              <div>
                <CustomButton color='green' onClick={() => setShowModal(false)}>
                  No
                </CustomButton>
              </div>
            </div>
          </div>
        </CustomModalWrapper>
      </Overlay>
    </div>
  );
};

export default Header;
