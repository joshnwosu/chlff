import { useNavigate } from 'react-router-dom';
import classes from './Mission.module.css';
import { motion } from 'framer-motion';

const Mission = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <motion.div
      className={classes.container}
      initial={{ opacity: 0, y: '100%' }} // Initial state: hidden and off-screen
      animate={{ opacity: 1, y: 0 }} // Final state: visible and on-screen
      transition={{ duration: 0.5 }} // Animation duration
    >
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
      </div>
    </motion.div>
  );
};

export default Mission;
