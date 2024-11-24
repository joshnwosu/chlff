import classes from './Assessment.module.css';
import PageWrapper from '../../components/Shared/PageWrapper/PageWrapper';
import { useAppSelector } from '../../app/hooks';
import Fish from '../../components/Game/Fish/Fish';

const Assessment: React.FC = () => {
  const { selectedYear } = useAppSelector((state) => state.control);
  return (
    <PageWrapper>
      <div className={classes.container}>
        {false && (
          <h1 className={classes.containerTitle}>
            Year {selectedYear} Assessment Questions
          </h1>
        )}

        <Fish mode='assessment' />
      </div>
    </PageWrapper>
  );
};

export default Assessment;
