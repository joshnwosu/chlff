import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './AuthRoutes';
import { useAppSelector } from '../app/hooks';
import Root from '../components/Root/Root';
import Login from '../views/Auth/Login/Login';
import StartGame from '../views/StartGame/StartGame';
import Assessment from '../views/Assessment/Assessment';
import ActionCenter from '../views/ActionCenter/ActionCenter';
import SelectLevel from '../views/SelectLevel/SelectLevel';

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

          <Route path='action-center' element={<Outlet />}>
            <Route index element={<ActionCenter />} />
            <Route path=':id/select-level' element={<SelectLevel />} />
          </Route>
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
