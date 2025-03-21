import { ReactNode } from 'react';
import classes from './PageWrapper.module.css';

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className={classes.page}>
      <div className={classes.pageWrapper}>{children}</div>
    </div>
  );
};

export default PageWrapper;
