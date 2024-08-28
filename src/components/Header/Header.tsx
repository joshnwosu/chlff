import { Link, useLocation, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    dispatch(logout());
  };

  const handleExit = async () => {
    // navigate(-1);
    navigate('/');
  };

  return (
    <div className={classes.header}>
      <div>
        {false && (
          <Link to='/'>
            <div className={classes.title}>CHLFF.</div>
          </Link>
        )}
      </div>

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
