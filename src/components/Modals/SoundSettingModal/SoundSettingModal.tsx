import classes from './SoundSettingModal.module.css';
import Overlay from '../../Shared/Overlay/Overlay';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleShowSoundSetting } from '../../../features/control/controlSlice';
import CustomButton from '../../Shared/CustomButton/CsutomButton';

export default function SoundSettingModal() {
  const dispatch = useAppDispatch();
  const { showSoundSettingModal } = useAppSelector((state) => state.control);

  const handleClose = () => {
    dispatch(toggleShowSoundSetting(false));
  };

  return (
    <Overlay opened={showSoundSettingModal}>
      <div className={classes.container}>
        <div className={classes.content}>
          <div></div>

          <CustomButton onClick={handleClose}>Close</CustomButton>
        </div>
      </div>
    </Overlay>
  );
}
