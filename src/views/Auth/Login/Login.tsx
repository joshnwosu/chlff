import { useAppDispatch } from '../../../app/hooks';
import CustomButton from '../../../components/Shared/CustomButton/CsutomButton';
import { toggleAuth } from '../../../features/auth/authSlice';

export default function Login() {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(toggleAuth(true));
  };

  return (
    <div>
      <CustomButton onClick={handleLogin}>Login</CustomButton>
    </div>
  );
}
