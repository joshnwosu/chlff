import classes from './SelectGenderModal.module.css';
import Overlay from '../../Shared/Overlay/Overlay';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleSelectGenderModal } from '../../../features/control/controlSlice';

export default function SelectGenderModal() {
  const dispatch = useAppDispatch();
  const { selectGenderModal } = useAppSelector((state) => state.control);

  const handleClose = () => {
    dispatch(toggleSelectGenderModal(false));
  };
  return (
    <Overlay opened={selectGenderModal} close={handleClose}>
      <div className={classes.container}>
        <p>Select Gender Modal</p>
      </div>
    </Overlay>
  );
}
