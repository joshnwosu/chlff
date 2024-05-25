import { useAppSelector } from './app/hooks';
import ActionCenter from './components/ActionCenter/ActionCenter';
import Assessment from './components/Assessment/Assessment';
import EntryLevel from './components/EntryLevel/EntryLevel';
import Header from './components/Header/Header';
import StartGame from './components/StartGame/StartGame';
import Game from './components/Game/Game';
import MathGame from './components/MathGame/MathGame';

function App() {
  const { startGame } = useAppSelector((state) => state.control);
  return (
    <>
      {!startGame ? (
        <StartGame />
      ) : (
        <>
          {false && <Header />}
          {false && <Game />}
          {false && <MathGame />}
          {false && <Assessment />}
          {true && <EntryLevel />}
          {false && <ActionCenter />}
        </>
      )}
    </>
  );
}

export default App;
