import classes from './Root.module.css';
import { Outlet } from 'react-router-dom';
import CongratulationModal from '../Modals/CongratulationModal/CongratulationModal';
import Header from '../Header/Header';
import SelectAssessmentYear from '../Modals/AssessmentYearModal/AssessmentYearModal';
import GameModeModal from '../Modals/GameModeModal/GameModeModal';
import SelectGame from '../Modals/SelectGame/SelectGame';
import SelectGenderModal from '../Modals/SelectGenderModal/SelectGenderModal';

const Root: React.FC = () => {
  return (
    <>
      <div className={classes.wrapper}>
        <Header />
        <Outlet />
      </div>

      <CongratulationModal />
      <SelectAssessmentYear />
      <GameModeModal />
      <SelectGame />
      <SelectGenderModal />
    </>
  );
};

export default Root;
