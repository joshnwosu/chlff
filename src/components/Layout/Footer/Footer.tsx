import classes from './Footer.module.css';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import VolumeIcon from '../../../icons/VolumeIcon';
import { useAppDispatch } from '../../../app/hooks';
import { toggleShowSoundSetting } from '../../../features/control/controlSlice';

const Footer: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleToggleSoundModal = async () => {
    console.log('toggle sound.');
    dispatch(toggleShowSoundSetting(true));
  };

  return (
    <div className={classes.footer}>
      <div></div>
      <div>
        {false && (
          <CustomButton onClick={handleToggleSoundModal}>
            <VolumeIcon size={34} color='#ffffff' />
          </CustomButton>
        )}

        <button onClick={handleToggleSoundModal}>
          <img src={`/assets/elements/sound-icon.png`} />
        </button>
      </div>
    </div>
  );
};

export default Footer;
