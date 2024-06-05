import { Link, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleExit = async () => {
    navigate(-1);
  };

  return (
    <div className={classes.header}>
      <Link to='/'>
        <div className={classes.title}>CHLFF.</div>
      </Link>

      <div>
        <button onClick={handleExit}>Exit</button>
      </div>
    </div>
  );
};

export default Header;
