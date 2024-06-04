import classes from './Root.module.css';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import CongratulationModal from '../Modals/CongratulationModal/CongratulationModal';
import Header from '../Header/Header';

const Root: React.FC = () => {
  const {} = useAppSelector((state) => state.control);

  return (
    <>
      <div className={classes.wrapper}>
        <Header />
        <Outlet />
      </div>

      <CongratulationModal />
    </>
  );
};

export default Root;
