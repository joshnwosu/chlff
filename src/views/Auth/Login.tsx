import classes from './Auth.module.css';
import { useAppDispatch } from '../../app/hooks';
import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import { toggleAuth } from '../../features/auth/authSlice';
import AuthWrapper from '../../components/Shared/AuthWrapper/AuthWrapper';

export default function Login() {
  const dispatch = useAppDispatch();

  const handleAuth = () => {
    dispatch(toggleAuth(true));
  };

  return (
    <AuthWrapper>
      <div className={classes.btnWrap}>
        <CustomButton onClick={handleAuth}>SCHOOL</CustomButton>
        <CustomButton onClick={handleAuth}>FAMILY</CustomButton>
        <CustomButton onClick={handleAuth}>TUTOR</CustomButton>
      </div>
    </AuthWrapper>
  );
}
