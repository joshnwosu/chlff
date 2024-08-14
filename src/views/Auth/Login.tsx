import classes from './Auth.module.css';
import { useAppDispatch } from '../../app/hooks';
import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import { toggleAuth } from '../../features/auth/authSlice';
import AuthWrapper from '../../components/Shared/AuthWrapper/AuthWrapper';

export default function Login() {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(toggleAuth(true));
  };

  return (
    <AuthWrapper>
      <div className={classes.btnWrap}>
        <CustomButton onClick={handleLogin}>SCHOOL</CustomButton>
        <CustomButton onClick={handleLogin}>FAMILY</CustomButton>
        <CustomButton onClick={handleLogin}>TUTOR</CustomButton>
      </div>
    </AuthWrapper>
  );
}
