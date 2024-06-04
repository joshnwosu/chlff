import { useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleExit = async () => {
    navigate(-1);
  };

  return (
    <div className={classes.header}>
      <div className={classes.title}>CHLFF.</div>

      <div>
        <button onClick={handleExit}>Exit</button>
      </div>
    </div>
  );
};

export default Header;
