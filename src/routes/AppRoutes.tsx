/* eslint-disable no-constant-condition */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './AuthRoutes';
import { useAppSelector } from '../app/hooks';
import Root from '../components/Root/Root';
import Login from '../views/Auth/Login/Login';
import StartGame from '../views/StartGame/StartGame';
import Assessment from '../views/Assessment/Assessment';
import ActionCenter from '../views/ActionCenter/ActionCenter';
import ShowRoom from '../views/ShowRoom/ShowRoom';
import Game from '../components/Game/Game';
import CarRaceTwo from '../components/Game/CarTwo/Game';
import PicturePuzzle from '../components/Game/PicturePuzzle/Game';
import Car from '../components/Game/Car/Car';
import MultiplicationTableCheck from '../components/MultiplicationTableCheck/MultiplicationTableCheck';

export default function AppRoutes() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Root />
            </ProtectedRoute>
          }
        >
          <Route index element={<StartGame />} />
          <Route path='assessment' element={<Assessment />} />
          <Route path='show-room' element={<ShowRoom />} />
          <Route path='game' element={true ? <Car /> : <Game />} />

          <Route path='action-center' element={<ActionCenter />} />
          <Route
            path='multiplication-tables-check'
            element={<MultiplicationTableCheck />}
          />
            <Route
            path='car-race-two'
            element={<CarRaceTwo />}
          />
            <Route
            path='picture-puzzle'
            element={<PicturePuzzle />}
          />
        </Route>

        <Route
          path='login'
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
    </Router>
  );
}
