import { Link, useLocation, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import { useAppDispatch } from '../../app/hooks';
import { toggleAuth } from '../../features/auth/authSlice';
const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    dispatch(toggleAuth(false));
  };

  const handleExit = async () => {
    navigate(-1);
  };

  return (
    <div className={classes.header}>
      <Link to='/'>
        <div className={classes.title}>CHLFF.</div>
      </Link>

      <div>
        {location.pathname === '/' ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleExit}>Exit</button>
        )}
      </div>
    </div>
  );
};

export default Header;
