import AppRoutes from './routes/AppRoutes';
import GradeSelection from './version2/GradeSelection/GradeSelection';
import LevelSelection from './version2/LevelSelection/LevelSelection';
import QuestionsDisplay from './version2/QuestionDisplay/QuestionDisplay';

function App() {
  return (
    <>
      <div>
        {true ? (
          <AppRoutes />
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
