import classes from './Register.module.css';
import { useAppDispatch } from '../../../app/hooks';
import CustomButton from '../../../components/Shared/CustomButton/CsutomButton';
import { toggleAuth } from '../../../features/auth/authSlice';
import AuthWrapper from '../../../components/Shared/AuthWrapper/AuthWrapper';

export default function Register() {
  const dispatch = useAppDispatch();

  const handleRegister = () => {
    dispatch(toggleAuth(true));
  };

  return (
    <AuthWrapper>
      <div className={classes.btn}>
        <CustomButton onClick={handleRegister}>Register</CustomButton>
      </div>
    </AuthWrapper>
  );
}
