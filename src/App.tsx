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
    soundPlayer.preloadSound('carbackground', 'sound/carbackground.mp3');
    soundPlayer.preloadSound('correct', 'sound/correct.wav');
    soundPlayer.preloadSound('wrong', 'sound/wrong.wav');
    soundPlayer.preloadSound('eat', 'sound/eat.wav');
    soundPlayer.preloadSound('underwater', 'sound/underWater.wav', true);
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
