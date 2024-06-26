import classes from './AssessmentYearModal.module.css';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleAssessmentYearModal } from '../../../features/control/controlSlice';
import Overlay from '../../Shared/Overlay/Overlay';

export default function AssessmentYearModal() {
  const dispatch = useAppDispatch();
  const { assessmentYearModal } = useAppSelector((state) => state.control);

  const handleClose = () => {
    dispatch(toggleAssessmentYearModal(!assessmentYearModal));
  };
  return (
    <Overlay opened={assessmentYearModal} close={handleClose}>
      <div className={classes.container}>
        <div className={classes.selectContainer}>
          <div className={classes.selectHeader}>
            <p>Pick Your Assessment Year!</p>
          </div>
          <div className={classes.selectContent}></div>
        </div>
      </div>
    </Overlay>
  );
}
