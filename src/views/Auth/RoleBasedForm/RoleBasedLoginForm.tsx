import React from 'react';

interface RoleBasedLoginFormProps {
  role: string | undefined;
}

const RoleBasedLoginForm: React.FC<RoleBasedLoginFormProps> = ({ role }) => {
  switch (role) {
    case 'learner':
      return (
        <div>
          <p>Welcome, Learner! Please log in below.</p>
          {/* Learner login form */}
        </div>
      );
    case 'parent':
      return (
        <div>
          <p>Welcome, Parent! Please log in below.</p>
          {/* Parent login form */}
        </div>
      );
    case 'tutor':
      return (
        <div>
          <p>Welcome, Tutor! Please log in below.</p>
          {/* Tutor login form */}
        </div>
      );
    case 'school':
      return (
        <div>
          <p>Welcome, School! Please log in below.</p>
          {/* School login form */}
        </div>
      );
    default:
      return null;
  }
};

export default RoleBasedLoginForm;
