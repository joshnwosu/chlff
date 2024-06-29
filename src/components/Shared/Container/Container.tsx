import { ReactNode } from 'react';
import classes from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default Container;
