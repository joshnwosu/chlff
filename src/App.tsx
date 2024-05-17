import './App.css';
import { useAppSelector } from './app/hooks';
// import Assessment from './components/Assessment/Assessment';
import EntryLevel from './components/EntryLevel/EntryLevel';
import Header from './components/Header/Header';
import StartGame from './components/StartGame/StartGame';
// import Game from './components/Game/Game';
// import MathGame from './components/MathGame/MathGame';

function App() {
  const { startGame } = useAppSelector((state) => state.control);
  return (
    <>
      {!startGame ? (
        <StartGame />
      ) : (
        <>
          <Header />
          {/* <Game /> */}
          {/* <MathGame /> */}
          {/* <Assessment /> */}
          <EntryLevel />
        </>
      )}
    </>
  );
}

export default App;
