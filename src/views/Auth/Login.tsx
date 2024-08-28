import AuthWrapper from '../../components/Shared/AuthWrapper/AuthWrapper';

import RoleBasedLoginForm from './RoleBasedForm/RoleBasedLoginForm';

export default function Login() {
  return (
    <AuthWrapper>
      <RoleBasedLoginForm />
    </AuthWrapper>
  );
}
