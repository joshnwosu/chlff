import classes from './Root.module.css';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import CongratulationModal from '../Modals/CongratulationModal/CongratulationModal';
import Header from '../Header/Header';
import SelectAssessmentYear from '../Modals/AssessmentYearModal/AssessmentYearModal';
import SelectLevelModal from '../Modals/SelectLevelModal/SelectLevelModal';
import GameModeModal from '../Modals/GameModeModal/GameModeModal';

const Root: React.FC = () => {
  const {} = useAppSelector((state) => state.control);

  return (
    <>
      <div className={classes.wrapper}>
        <Header />
        <Outlet />
      </div>

      <CongratulationModal />
      <SelectAssessmentYear />
      <SelectLevelModal />
      <GameModeModal />
    </>
  );
};

export default Root;
