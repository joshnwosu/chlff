import Overlay from '../../Shared/Overlay/Overlay';
import CustomModalWrapper from '../../Shared/CustomModalWrapper/CustomModalWrapper';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logout } from '../../../features/auth/authSlice';
import { toggleLogoutConfirmModal } from '../../../features/control/controlSlice';

export default function LogoutConfirmModal() {
  const dispatch = useAppDispatch();
  const { showLogoutConfirmModal } = useAppSelector((state) => state.control);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Overlay opened={showLogoutConfirmModal}>
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
              <CustomButton
                color='green'
                onClick={() => dispatch(toggleLogoutConfirmModal(false))}
              >
                No
              </CustomButton>
            </div>
          </div>
        </div>
      </CustomModalWrapper>
    </Overlay>
  );
}
