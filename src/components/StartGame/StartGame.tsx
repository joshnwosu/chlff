import './StartGame.css';
import CustomButton from '../Shared/CustomButton/CsutomButton';
import { useAppDispatch } from '../../app/hooks';
import { toggleStartGame } from '../../features/control/controlSlice';

const StartGame: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleStart = async () => {
    dispatch(toggleStartGame(true));
  };
  return (
    <div className='start_game'>
      <h3>Ready for your Assessment Test?</h3>
      <div>
        <CustomButton onClick={handleStart}>START NOW</CustomButton>
      </div>
    </div>
  );
};

export default StartGame;
