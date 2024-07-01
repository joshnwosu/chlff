import { useAppDispatch } from '../../../app/hooks';
import CustomButton from '../../../components/Shared/CustomButton/CsutomButton';
import { toggleAuth } from '../../../features/auth/authSlice';

export default function Login() {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(toggleAuth(true));
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <CustomButton onClick={handleLogin}>Login</CustomButton>
      </div>
    </div>
  );
}
