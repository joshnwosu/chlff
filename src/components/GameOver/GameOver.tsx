import CustomButton from '../Shared/CustomButton/CsutomButton';
import './GameOver.css';

const GameOver: React.FC = () => {
  return (
    <div className='game_over'>
      <div className='game_over_container'>
        <h1 className='game_over_title'>
          {'Congratulations!' || 'Game Overs!'}
        </h1>

        <div>
          <h2>Year 2 learning unlocked!</h2>
          <div>
            <CustomButton>Continue</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
