import classes from './ReadyAssessment.module.css';
import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import { useNavigate } from 'react-router-dom';
import ElementWrapper from '../../components/Shared/ElementWrapper/ElementWrapper';

const ReadyAssessment: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/pick-a-year');
  };

  const handleNo = async () => {
    navigate(-1);
  };

  return (
    <div className={classes.start_game}>
      <ElementWrapper
        height={380}
        // title='WELCOME'
        backgroundImage='/assets/elements/assessment_test-board.png'
      >
        <div
          style={{
            flex: 1,

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 10,
            padding: 20,
          }}
        >
          <p
            style={{
              color: 'yellow',
              fontSize: 24,
            }}
          >
            Are you ready for your Assessment Test?
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <CustomButton onClick={handleStart}>YES</CustomButton>
          <CustomButton color='red' onClick={handleNo}>
            NO
          </CustomButton>
        </div>
      </ElementWrapper>
    </div>
  );
};

export default ReadyAssessment;
