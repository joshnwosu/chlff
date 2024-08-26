import classes from './Mission.module.css';
import CloseIcon from '../../icons/CloseIcon';
import CustomButton from '../Shared/CustomButton/CsutomButton';

const Mission = () => {
  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <div className={classes.header}>
          <h1 className={classes.title}>Mission</h1>

          <CloseIcon
            fill='red'
            style={{
              position: 'absolute',
              right: 20,
              cursor: 'pointer',
            }}
          />
        </div>

        <div className={classes.content}>
          <h1>The School is on Fire: Save the School!</h1>
          <p>Mission: Get all the answers correct to put out the fire.</p>
          <div className={classes.btnWrap}>
            <CustomButton>Start</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
