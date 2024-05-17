import './App.css';
import Field from './components/Field/Field';
import Game from './components/Game/Game';

function App() {
  return (
    <>
      {true && <Game />}
      {false && <Field />}
    </>
  );
}

export default App;
