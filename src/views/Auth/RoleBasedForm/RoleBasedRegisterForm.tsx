import React from 'react';
import { validRoles } from '../../../routes/validRoles';
import NotFound from '../../NotFound/NotFound';

interface RoleBasedRegisterFormProps {
  role: string | undefined;
}

const RoleBasedRegisterForm: React.FC<RoleBasedRegisterFormProps> = ({
  role,
}) => {
  if (role && !validRoles.includes(role)) {
    return <NotFound />;
  }

  switch (role) {
    case 'learner':
      return (
        <div>
          <p>Welcome, Learner! Please fill out the form below.</p>
          {/* Learner registration form */}
        </div>
      );
    case 'parent':
      return (
        <div>
          <p>Welcome, Parent! Please fill out the form below.</p>
          {/* Parent registration form */}
        </div>
      );
    case 'tutor':
      return (
        <div>
          <p>Welcome, Tutor! Please fill out the form below.</p>
          {/* Tutor registration form */}
        </div>
      );
    case 'school':
      return (
        <div>
          <p>Welcome, School! Please fill out the form below.</p>
          {/* School registration form */}
        </div>
      );
    default:
      return null;
  }
};

export default RoleBasedRegisterForm;
