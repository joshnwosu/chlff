import { useAppDispatch } from '../../app/hooks';
import { toggleStartGame } from '../../features/control/controlSlice';
import './Header.css';
const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleExit = async () => {
    dispatch(toggleStartGame(false));
  };
  return (
    <div className='header'>
      <div className='title'>CHLFF.</div>

      <div>
        <button onClick={handleExit}>Exit</button>
      </div>
    </div>
  );
};

export default Header;
