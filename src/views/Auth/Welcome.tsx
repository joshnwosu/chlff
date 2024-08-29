import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import AuthWrapper from '../../components/Shared/AuthWrapper/AuthWrapper';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { toggleAuth } from '../../features/auth/authSlice';

export default function Welcom() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleAutoLogin = () => {
    dispatch(toggleAuth(true));
  };

  return (
    <AuthWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <CustomButton onClick={handleLogin}>Login</CustomButton>
        <CustomButton onClick={handleRegister}>Register</CustomButton>
        {false && (
          <CustomButton onClick={handleAutoLogin}>Auto Login</CustomButton>
        )}
      </div>
    </AuthWrapper>
  );
}
