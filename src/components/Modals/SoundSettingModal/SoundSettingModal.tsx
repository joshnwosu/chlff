import classes from './SoundSettingModal.module.css';
import Overlay from '../../Shared/Overlay/Overlay';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleShowSoundSetting } from '../../../features/control/controlSlice';
import { useEffect, useState } from 'react';
import { setVolume, toggleSound } from '../../../features/sound/soundSlice';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import CustomModalWrapper from '../../Shared/CustomModalWrapper/CustomModalWrapper';

export default function SoundSettingModal() {
  const dispatch = useAppDispatch();
  const { showSoundSettingModal } = useAppSelector((state) => state.control);
  const { isSoundEnabled, volume } = useAppSelector((state) => state.sound);
  const [localVolume, setLocalVolume] = useState(volume);

  // Sync local volume with Redux volume
  useEffect(() => {
    setLocalVolume(volume);
  }, [volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setLocalVolume(newVolume);
    dispatch(setVolume(newVolume));
  };

  const handleToggleSound = () => {
    dispatch(toggleSound());
  };

  const handleClose = () => {
    dispatch(toggleShowSoundSetting(false));
  };

  return (
    <Overlay opened={showSoundSettingModal}>
      <CustomModalWrapper>
        <div className={classes['sound-settings-content']}>
          <div className={classes['sound-control-item']}>
            <div className={classes['sound-control-header']}>
              <h3 className={classes['sound-control-title']}>Music</h3>
              <label className={classes.switch}>
                <input
                  type='checkbox'
                  checked={isSoundEnabled}
                  onChange={handleToggleSound}
                  aria-label='Toggle sound effects'
                />
                <span className={`${classes.slider} ${classes.round}`}></span>
              </label>
            </div>

            <div className={classes['volume-control']}>
              <label htmlFor='volume-slider'>Volume</label>
              <input
                id='volume-slider'
                type='range'
                min='0'
                max='1'
                step='0.1'
                value={localVolume}
                onChange={handleVolumeChange}
                className={classes['volume-slider']}
                aria-valuetext={`${Math.round(localVolume * 100)}%`}
              />
              <span className={classes['volume-percentage']}>
                {Math.round(localVolume * 100)}%
              </span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <div>
              <CustomButton color='red' onClick={handleClose}>
                Close
              </CustomButton>
            </div>
          </div>
        </div>
      </CustomModalWrapper>
    </Overlay>
  );
}
