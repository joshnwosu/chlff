import classes from './Mission.module.css';
import { motion } from 'framer-motion';

interface MissionProps {
  image?: string;
  onPress: () => void;
}

const Mission = ({
  onPress,
  image = 'assets/mission/doctor_mission/mission1_modal.png',
}: MissionProps) => {
  const handleClick = () => {
    onPress();
  };

  return (
    <motion.div
      className={classes.container}
      initial={{ opacity: 0, y: '100%' }} // Initial state: hidden and off-screen
      animate={{ opacity: 1, y: 0 }} // Final state: visible and on-screen
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 0.5 }} // Animation duration
    >
      {/* {false && (
        <div className={classes.board}>
          <div className={classes.content}>
            <h1>Mission</h1>
            <div className={classes.body}>
              <p className={classes.title}>Hey, firefighter!</p>
              <p>Extinguishing a forest fire and rescuing animals.</p>
            </div>
          </div>
          <div className={classes.continueBtn} onClick={handleClick}>
            <img src='assets/mission/button.png' />
            <h4>Contine</h4>
          </div>
        <div className={classes.continueBtn} onClick={handleClick}>
          <img src='assets/mission/button.png' />
          <h4>Continue</h4>
        </div>
      )} */}

      <img
        src={image}
        style={{
          width: '500px',
          height: '500px',
          objectFit: 'contain',
          objectPosition: 'center',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      />
    </motion.div>
  );
};

export default Mission;
