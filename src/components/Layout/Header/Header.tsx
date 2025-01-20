import { useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
// import CustomButton from '../../Shared/CustomButton/CsutomButton';
// import GoBackIcon from '../../../icons/GoBackIcon';
const Header: React.FC = () => {
  const navigate = useNavigate();

  const goBback = async () => {
    navigate(-1);
  };

  return (
    <div className={classes.header}>
      <div>
        {true && (
          <>
            {/* <CustomButton onClick={goBback}>
            <GoBackIcon size={34} color='#ffffff' />
          </CustomButton> */}

            <button onClick={goBback}>
              <img src={`/assets/elements/back-arrow.png`} />
            </button>
          </>
        )}
      </div>

      <div>
        <CustomButton color='red'>Exit</CustomButton>
      </div>
    </div>
  );
};

export default Header;
