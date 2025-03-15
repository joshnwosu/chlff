import classes from './Assessment.module.css';
import PageWrapper from '../../components/Shared/PageWrapper/PageWrapper';
import Fish from '../../components/Game/Fish/Fish';

const Assessment: React.FC = () => {
  return (
    <PageWrapper>
      <div className={classes.container}>
        <Fish mode='assessment' />
      </div>
    </PageWrapper>
  );
};

export default Assessment;
