import classes from './Footer.module.css';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import VolumeIcon from '../../../icons/VolumeIcon';

const Footer: React.FC = () => {
  const handleToggleSound = async () => {
    console.log('toggle sound.');
  };

  return (
    <div className={classes.footer}>
      <div></div>
      <div>
        {false && (
          <CustomButton onClick={handleToggleSound}>
            <VolumeIcon size={34} color='#ffffff' />
          </CustomButton>
        )}

        <button onClick={handleToggleSound}>
          <img src={`/assets/elements/sound-icon.png`} />
        </button>
      </div>
    </div>
  );
};

export default Footer;
