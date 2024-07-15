import classes from './SelectLevelModal.module.css';
import Overlay from '../../Shared/Overlay/Overlay';
import {
  toggleGameModeModal,
  toggleSelectLevelModal,
} from '../../../features/control/controlSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import LockIcon from '../../../icons/LockIcon';
import StarRating from '../../Shared/StarRating/StarRating';
import GamePopupModal from '../GamePopupModal/GamePopupModal';

export default function SelectLevelModal() {
  const dispatch = useAppDispatch();
  const { selectLevelModal } = useAppSelector((state) => state.control);
  const handleClose = () => {
    dispatch(toggleSelectLevelModal(!selectLevelModal));
  };

  const levels = [
    { status: 'unlocked', star: 0 },
    { status: 'locked', star: 0 },
    { status: 'locked', star: 0 },
    { status: 'locked', star: 0 },
    { status: 'locked', star: 0 },
    { status: 'locked', star: 0 },
    { status: 'locked', star: 0 },
    { status: 'locked', star: 0 },
    { status: 'locked', star: 0 },
    { status: 'locked', star: 0 },
  ];

  const handleClick = () => {
    handleClose();
    dispatch(toggleGameModeModal(true));
  };

  return (
    <Overlay opened={selectLevelModal} close={handleClose}>
      <GamePopupModal title='Select Level'>
        {levels.map((item, index) => (
          <div key={index.toString()} className={classes['level-btn-wrap']}>
            <button
              className={`${classes['level-btn']} ${
                item.status === 'locked' && classes['level-btn-locked']
              }`}
              disabled={item.status === 'locked'}
              onClick={handleClick}
            >
              {item.status === 'locked' ? <LockIcon size={30} /> : index + 1}
            </button>
            <StarRating score={item.star || 0} />
          </div>
        ))}
      </GamePopupModal>
    </Overlay>
  );
}
