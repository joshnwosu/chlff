import classes from './Assessment.module.css';
import PageWrapper from '../../components/Shared/PageWrapper/PageWrapper';
import { useAppSelector } from '../../app/hooks';
import Fish from '../../components/Game/Fish/Fish';
import { useEffect } from 'react';
import { useSoundControls } from '../../context/useSoundContext';

const Assessment: React.FC = () => {
  const { selectedYear } = useAppSelector((state) => state.control);
  const { stop, play } = useSoundControls();

  useEffect(() => {
    stop('backgroundMusic');
    play('backgroundFish', { loop: true });

    console.log('Hiii');
  }, []);

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
