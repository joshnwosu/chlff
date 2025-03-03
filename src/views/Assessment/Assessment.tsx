import classes from './Assessment.module.css';
import PageWrapper from '../../components/Shared/PageWrapper/PageWrapper';
import Fish from '../../components/Game/Fish/Fish';
import { useEffect } from 'react';
import { useSoundControls } from '../../context/useSoundContext';

const Assessment: React.FC = () => {
  const { stop, play } = useSoundControls();

  useEffect(() => {
    stop('backgroundMusic');
    play('backgroundFish', { loop: true });

    console.log('Hiii');
  }, []);

  return (
    <PageWrapper>
      <div className={classes.container}>
        <Fish mode='assessment' />
      </div>
    </PageWrapper>
  );
};

export default Assessment;
