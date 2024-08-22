import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import AuthWrapper from '../../components/Shared/AuthWrapper/AuthWrapper';
import { useNavigate } from 'react-router-dom';

export default function Welcom() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <AuthWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <CustomButton onClick={handleLogin}>Login</CustomButton>
        <CustomButton onClick={handleRegister}>Register</CustomButton>
      </div>
    </AuthWrapper>
  );
}
