import { ReactNode } from 'react';
import classes from './AuthWrapper.module.css';

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <div className={classes.authWrapper}>
      <div className={classes.container}>{children}</div>
    </div>
  );
}
