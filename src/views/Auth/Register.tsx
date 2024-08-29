import classes from './Auth.module.css';
import CustomButton from '../../components/Shared/CustomButton/CsutomButton';

import AuthWrapper from '../../components/Shared/AuthWrapper/AuthWrapper';
import { useNavigate, useParams } from 'react-router-dom';
import RoleBasedRegisterForm from './RoleBasedForm/RoleBasedRegisterForm';

export default function Register() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();

  const handleRoleClick = (role: string) => {
    navigate(`/register/${role}`);
  };

  return (
    <AuthWrapper>
      {/* Only show buttons when no role is selected */}
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

      {role && <RoleBasedRegisterForm role={role} />}
    </AuthWrapper>
  );
}
