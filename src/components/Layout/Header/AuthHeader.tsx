import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';

const AuthHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBback = async () => {
    navigate(-1);
  };

  return (
    <div className={classes.header}>
      <div>
        {!['/welcome'].includes(location.pathname) && (
          <button onClick={goBback}>
            <img
              className={classes.backArrow}
              src={`/assets/elements/back-arrow.png`}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthHeader;
