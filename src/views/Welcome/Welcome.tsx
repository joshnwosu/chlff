// import classes from './Login.module.css';
import { useAppDispatch } from '../../app/hooks';
import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import { toggleAuth } from '../../features/auth/authSlice';
import AuthWrapper from '../../components/Shared/AuthWrapper/AuthWrapper';

export default function Welcom() {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(toggleAuth(true));
  };

  return (
    <AuthWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <CustomButton onClick={handleLogin}>Login</CustomButton>
        <CustomButton onClick={handleLogin}>Register</CustomButton>
      </div>
    </AuthWrapper>
  );
}
