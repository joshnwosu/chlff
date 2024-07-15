import classes from './SelectLevelModal.module.css';
import Overlay from '../../Shared/Overlay/Overlay';
import {
  toggleGameModeModal,
  toggleSelectLevelModal,
} from '../../../features/control/controlSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import LockIcon from '../../../icons/LockIcon';
import StarRating from '../../Shared/StarRating/StarRating';

export default function SelectLevelModal() {
  const dispatch = useAppDispatch();
  const { selectLevelModal } = useAppSelector((state) => state.control);
  const handleClose = () => {
    dispatch(toggleSelectLevelModal(!selectLevelModal));
  };

  const levels = [
    { name: 'xs', status: 'unlocked' },
    { name: 'sm', status: 'locked' },
    { name: 'md', status: 'locked' },
    { name: 'lg', status: 'locked' },
    { name: 'xl', status: 'locked' },
    { name: 'sm', status: 'locked' },
    { name: 'md', status: 'locked' },
    { name: 'lg', status: 'locked' },
    { name: 'xl', status: 'locked' },
    { name: 'sm', status: 'locked' },
    { name: 'md', status: 'locked' },
    { name: 'lg', status: 'locked' },
    { name: 'xl', status: 'locked' },
  ];

  const handleClick = () => {
    handleClose();
    dispatch(toggleGameModeModal(true));
  };

  return (
    <Overlay opened={selectLevelModal} close={handleClose}>
      <div className={classes.container}>
        <div className={classes.selectContainer}>
          <div className={classes.selectHeader}>
            <p className={classes.selectHeaderTitle}>Select Level</p>
          </div>
          <div className={classes.selectContent}>
            <div className={classes.selectScroll}>
              {levels.map((item, index) => (
                <div key={index.toString()}>
                  {/* <button className={classes.button}>{index + 1}</button> */}
                  <button
                    className={`${classes['level-btn']} ${
                      item.status === 'locked' && classes['level-btn-locked']
                    }`}
                    // className={classes['btn-old-pc']}
                    // data-title={item.status === 'unlocked' ? index + 1 : ''}
                    disabled={item.status === 'locked'}
                    // style={{
                    //   opacity: item.status === 'locked' ? 0.5 : 1,
                    //   cursor:
                    //     item.status === 'locked' ? 'not-allowed' : 'pointer',
                    // }}
                    onClick={handleClick}
                  >
                    {item.status === 'locked' ? (
                      <LockIcon size={30} />
                    ) : (
                      index + 1
                    )}
                  </button>
                  <StarRating score={0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
