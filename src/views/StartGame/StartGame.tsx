import classes from './StartGame.module.css';
import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import { Link } from 'react-router-dom';

const StartGame: React.FC = () => {
  return (
    <div className={classes.start_game}>
      <h3>Ready for your Assessment Test?</h3>
      <div>
        <Link to={'/assessment'}>
          <CustomButton>START NOW</CustomButton>
        </Link>

        <Link to={'/action-center'}>
          <CustomButton>ACTION CENTER</CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default StartGame;
