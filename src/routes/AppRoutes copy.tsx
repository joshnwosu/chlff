/* eslint-disable no-constant-condition */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './AuthRoutes';
import { useAppSelector } from '../app/hooks';
import Root from '../components/Root/Root';
import Login from '../views/Auth/Login';
import Register from '../views/Auth/Register';
import Welcome from '../views/Auth/Welcome';
import StartGame from '../views/StartGame/StartGame';
import Assessment from '../views/Assessment/Assessment';
import ActionCenter from '../views/ActionCenter/ActionCenter';
import ShowRoom from '../views/ShowRoom/ShowRoom';
import CarRaceTwo from '../components/Game/CarTwo/Game';
import PicturePuzzle from '../components/Game/PicturePuzzle/Game';
import MultiplicationTableCheck from '../components/MultiplicationTableCheck/MultiplicationTableCheck';
import Car from '../components/Game/Car/Car';
import FishInGame from '../components/Game/FishInGame/FishInGame';
import NotFound from '../views/NotFound/NotFound';
import PlayerSettings from '../views/PlayerSettings/PlayerSettings';
import CurvedLineLevels from '../views/Level/Level';
import PickAYear from '../views/PickAYear/PickAYear';
import ReadyAssessment from '../views/ReadyAssessment/ReadyAssessment';
// import { useState } from 'react';

export default function AppRoutes() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);

  // const [valueIndex] = useState<number>(2);

  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route
          path='/'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Root />
            </ProtectedRoute>
          }
        >
          <>
            {!user?.assessmentPassed ? (
              <>
                <Route index element={<StartGame />} />
                <Route path='/pick-a-year' element={<PickAYear />} />
                <Route path='assessment' element={<Assessment />} />
                <Route path='ready-game' element={<ReadyAssessment />} />
              </>
            ) : (
              <>
                <Route index element={<ActionCenter />} />
                <Route path='show-room' element={<ShowRoom />} />
                <Route path='player-settings' element={<PlayerSettings />} />
                <Route path='game' element={<Car />} />
                <Route
                  path='multiplication-tables-check'
                  element={<MultiplicationTableCheck />}
                />
                <Route path='car-race-two' element={<CarRaceTwo />} />
                <Route path='picture-puzzle' element={<PicturePuzzle />} />
                <Route path='fishing' element={<FishInGame />} />
                <Route path='level' element={<CurvedLineLevels />} />
              </>
            )}
          </>
        </Route>

        {/* Public Routes */}
        <Route
          path='/welcome'
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Welcome />
            </PublicRoute>
          }
        />

        <Route
          path='/login'
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path='/login/:role'
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path='/register'
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path='/register/:role'
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Register />
            </PublicRoute>
          }
        />

        {/* 404 Route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
