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
import { updateGameLevel } from '../../../features/game/gameSlice';

export default function SelectLevelModal() {
  const dispatch = useAppDispatch();
  const { selectLevelModal } = useAppSelector((state) => state.control);
  const {selectedGame, selectedGameLevel} = useAppSelector((state) => state.game);

  const handleClose = () => {
    dispatch(toggleSelectLevelModal(!selectLevelModal));
  };


  const handleClick = () => {
    handleClose();
    dispatch(toggleGameModeModal(true));
  };

  const handleNextLevel = () => {
    console.log('Hello:', selectedGameLevel), 
    dispatch(updateGameLevel({
      gameName: selectedGame?.name || '',
        level: selectedGameLevel!,
        star: 3,
    }))
  }

  return (
    <Overlay opened={selectLevelModal} close={handleClose}>
      <h1>{selectedGame?.name}</h1>
      <button onClick={handleNextLevel}>Next level</button>
      <GamePopupModal title='Select Level'>
        {selectedGame?.levels.map((item, index) => (
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
