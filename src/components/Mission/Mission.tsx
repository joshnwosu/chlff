import classes from './Mission.module.css';
import CloseIcon from '../../icons/CloseIcon';

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
          <h1>Rescue Mission: Save the City!</h1>
          <p>Mission: Get all the answers correct to put out the fire.</p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
