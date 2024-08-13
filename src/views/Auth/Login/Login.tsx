import classes from './Login.module.css';
import { useAppDispatch } from '../../../app/hooks';
import CustomButton from '../../../components/Shared/CustomButton/CsutomButton';
import { toggleAuth } from '../../../features/auth/authSlice';
import AuthWrapper from '../../../components/Shared/AuthWrapper/AuthWrapper';

export default function Login() {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(toggleAuth(true));
  };

  return (
    <AuthWrapper>
      <div className={classes.btn}>
        <CustomButton onClick={handleLogin}>Login</CustomButton>
      </div>
    </AuthWrapper>
  );
}
