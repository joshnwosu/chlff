import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import GradeSelection from './version2/GradeSelection/GradeSelection';
import LevelSelection from './version2/LevelSelection/LevelSelection';
import QuestionsDisplay from './version2/QuestionDisplay/QuestionDisplay';
import { soundPlayer } from './utils/sound';

function App() {
  const [isTrue] = useState<boolean>(true);

  useEffect(() => {
    soundPlayer.preloadSound('startgame', 'sound/startgame.mp3');
    soundPlayer.preloadSound('carbackground', 'sound/carbackground.mp3', true);
    soundPlayer.preloadSound('backgroundfish', 'sound/background-for-fish.mp3');
    soundPlayer.preloadSound('correct', 'sound/correct.mp3');
    soundPlayer.preloadSound('wrong', 'sound/wrong.mp3');
    soundPlayer.preloadSound('eat', 'sound/eat.mp3');
    soundPlayer.preloadSound('underwater', 'sound/underWater.mp3', true);
    soundPlayer.preloadSound('levelup', 'sound/levelUp.mp3');
  }, []);

  return (
    <>
      <div>
        {isTrue ? (
          <>
            <AppRoutes />
          </>
        ) : (
          <>
            <GradeSelection />
            <LevelSelection />
            <QuestionsDisplay />
          </>
        )}
      </div>
    </>
  );
}

export default App;
