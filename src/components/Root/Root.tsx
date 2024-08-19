import classes from './Root.module.css';
import { Outlet } from 'react-router-dom';
import CongratulationModal from '../Modals/CongratulationModal/CongratulationModal';
import Header from '../Header/Header';
import SelectAssessmentYear from '../Modals/AssessmentYearModal/AssessmentYearModal';
import SelectLevelModal from '../Modals/SelectLevelModal/SelectLevelModal';
import GameModeModal from '../Modals/GameModeModal/GameModeModal';
import SelectGame from '../Modals/SelectGame/SelectGame';

const Root: React.FC = () => {
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
      <SelectGame />
    </>
  );
};

export default Root;
