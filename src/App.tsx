import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { soundPlayer } from './utils/sound';

function App() {
  useEffect(() => {
    soundPlayer.preloadSound('startgame', 'sound/startgame.mp3', true);
    soundPlayer.preloadSound('carbackground', 'sound/carbackground.mp3', true);
    soundPlayer.preloadSound('backgroundfish', 'sound/background-for-fish.mp3');
    soundPlayer.preloadSound('correct', 'sound/correct.mp3');
    soundPlayer.preloadSound('wrong', 'sound/wrong.mp3');
    soundPlayer.preloadSound('eat', 'sound/eat.mp3');
    soundPlayer.preloadSound('underwater', 'sound/underWater.mp3', true);
    soundPlayer.preloadSound(
      'driving',
      'sound/driving-in-a-car-6227.mp3',
      true
    );
    soundPlayer.preloadSound('levelup', 'sound/levelUp.mp3');

    soundPlayer.setVolume('startgame', 0.4);
    soundPlayer.setVolume('carbackground', 0.4);
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
