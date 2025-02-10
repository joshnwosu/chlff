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
    handleCancelLogout();
  };

  const handleCancelLogout = () => {
    dispatch(toggleLogoutConfirmModal(false));
  };

  return (
    <Overlay opened={showLogoutConfirmModal}>
      <CustomModalWrapper title='Do you want to logout?'>
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
            <CustomButton color='green' onClick={handleCancelLogout}>
              No
            </CustomButton>
          </div>
        </div>
      </CustomModalWrapper>
    </Overlay>
  );
}
