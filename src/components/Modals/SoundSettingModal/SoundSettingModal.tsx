import classes from './SoundSettingModal.module.css';
import Overlay from '../../Shared/Overlay/Overlay';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleShowSoundSetting } from '../../../features/control/controlSlice';
import { useState } from 'react';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import CustomModalWrapper from '../../Shared/CustomModalWrapper/CustomModalWrapper';
import { _useAudio } from '../../../hook/_useAudio';

export default function SoundSettingModal() {
  const dispatch = useAppDispatch();
  const { showSoundSettingModal } = useAppSelector((state) => state.control);

  const handleClose = () => {
    dispatch(toggleShowSoundSetting(false));
  };

  const {
    toggleBackgroundSound,
    toggleEffectsSound,
    isBackgroundMuted,
    isEffectsMuted,
    backgroundVolume,
    effectsVolume,
    setBackgroundVolume,
    setEffectsVolume,
  } = _useAudio();
  const [tempBackgroundVolume, setTempBackgroundVolume] =
    useState(backgroundVolume);
  const [tempEffectsVolume, setTempEffectsVolume] = useState(effectsVolume);

  const handleToggleBackgroundSound = () => {
    toggleBackgroundSound();
  };

  const handleToggleEffectsSound = () => {
    toggleEffectsSound();
  };

  const handleBackgroundVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVolume = parseFloat(event.target.value);
    setTempBackgroundVolume(newVolume);
    setBackgroundVolume(newVolume);
  };

  const handleEffectsVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVolume = parseFloat(event.target.value);
    setTempEffectsVolume(newVolume);
    setEffectsVolume(newVolume);
  };

  return (
    <Overlay opened={showSoundSettingModal}>
      <CustomModalWrapper>
        <div className={classes['sound-settings-content']}>
          <div className={classes['sound-control-item']}>
            <div className={classes['sound-control-header']}>
              <h3 className={classes['sound-control-title']}>
                Background Sound:
              </h3>
              <label className={classes.switch}>
                <input
                  type='checkbox'
                  checked={!isBackgroundMuted}
                  onChange={handleToggleBackgroundSound}
                  aria-label='Toggle sound effects'
                />
                <span className={`${classes.slider} ${classes.round}`}></span>
              </label>
            </div>

            <div className={classes['sound-control-header']}>
              <h3 className={classes['sound-control-title']}>Effect Sound:</h3>
              <label className={classes.switch}>
                <input
                  type='checkbox'
                  checked={!isEffectsMuted}
                  onChange={handleToggleEffectsSound}
                  aria-label='Toggle sound effects'
                />
                <span className={`${classes.slider} ${classes.round}`}></span>
              </label>
            </div>

            <div className={classes['volume-control']}>
              <label htmlFor='volume-slider'>Background Volume:</label>
              <div className={classes.flex}>
                <input
                  id='volume-slider'
                  type='range'
                  min='0'
                  max='1'
                  step='0.1'
                  value={tempBackgroundVolume}
                  onChange={handleBackgroundVolumeChange}
                  className={classes['volume-slider']}
                  aria-valuetext={`${Math.round(tempBackgroundVolume * 100)}%`}
                />
                <span className={classes['volume-percentage']}>
                  {Math.round(tempBackgroundVolume * 100)}%
                </span>
              </div>
            </div>

            <div className={classes['volume-control']}>
              <label htmlFor='volume-slider'>Effect Volume:</label>
              <div className={classes.flex}>
                <input
                  id='volume-slider'
                  type='range'
                  min='0'
                  max='1'
                  step='0.1'
                  value={tempEffectsVolume}
                  onChange={handleEffectsVolumeChange}
                  className={classes['volume-slider']}
                  aria-valuetext={`${Math.round(tempEffectsVolume * 100)}%`}
                />
                <span className={classes['volume-percentage']}>
                  {Math.round(tempEffectsVolume * 100)}%
                </span>
              </div>
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
