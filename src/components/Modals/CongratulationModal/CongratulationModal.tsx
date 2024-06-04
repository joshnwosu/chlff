import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleShowCongratulationModal } from '../../../features/control/controlSlice';
import Overlay from '../../Shared/Overlay/Overlay';
import classes from './CongratulationModal.module.css';

export default function CongratulationModal() {
  const dispatch = useAppDispatch();
  const { showCongratulationModal } = useAppSelector((state) => state.control);

  const handleClose = () => {
    dispatch(toggleShowCongratulationModal(!showCongratulationModal));
  };

  return (
    <Overlay opened={showCongratulationModal} close={handleClose}>
      <div className={classes.congratulation}>CongratulationModal</div>
    </Overlay>
  );
}
