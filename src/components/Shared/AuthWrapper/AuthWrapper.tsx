import { ReactNode } from 'react';
import classes from './AuthWrapper.module.css';
import AuthHeader from '../../Layout/Header/AuthHeader';

interface AuthWrapperProps {
  children: ReactNode;
  withLogo?: boolean;
}

export default function AuthWrapper({
  children,
  withLogo = true,
}: AuthWrapperProps) {
  return (
    <div className={classes.authWrapper}>
      <AuthHeader />
      <div className={classes.container}>
        {withLogo && (
          <div className={classes.logoContainer}>
            <img src='/assets/CHLFF_Logo.png' className={classes.logo} />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
