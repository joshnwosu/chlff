import { ReactNode } from 'react';
import './PageWrapper.css';

interface PageWrapperProps {
  children: ReactNode;
}
const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return <div className='pageWrapper'>{children}</div>;
};

export default PageWrapper;
