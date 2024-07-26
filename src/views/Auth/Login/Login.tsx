import classes from "./Login.module.css";
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
      className={classes.container}
    >
      <div>
        <CustomButton onClick={handleLogin}>Login</CustomButton>
      </div>
    </div>
  );
}
