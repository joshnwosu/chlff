import classes from './Auth.module.css';
import { useAppDispatch } from '../../app/hooks';
import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import AuthWrapper from '../../components/Shared/AuthWrapper/AuthWrapper';
import { useNavigate, useParams } from 'react-router-dom';
import RoleBasedLoginForm from './RoleBasedForm/RoleBasedLoginForm';

export default function Login() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRoleClick = (role: string) => {
    navigate(`/login/${role}`);
    console.log(dispatch);
  };

  return (
    <AuthWrapper>
      {!role && (
        <div className={classes.btnWrap}>
          <CustomButton onClick={() => handleRoleClick('learner')}>
            LEARNER
          </CustomButton>
          <CustomButton onClick={() => handleRoleClick('school')}>
            SCHOOL
          </CustomButton>
          <CustomButton onClick={() => handleRoleClick('parent')}>
            PARENT
          </CustomButton>
          <CustomButton onClick={() => handleRoleClick('tutor')}>
            TUTOR
          </CustomButton>
        </div>
      )}

      {role && <RoleBasedLoginForm role={role} />}
    </AuthWrapper>
  );
}
