import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './AuthRoutes';
import { useAppSelector } from '../app/hooks';
import Root from '../components/Root/Root';
import Login from '../views/Auth/Login/Login';
import StartGame from '../views/StartGame/StartGame';
import Assessment from '../views/Assessment/Assessment';
import ActionCenter from '../views/ActionCenter/ActionCenter';

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
          <Route path='action-center' element={<ActionCenter />} />
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
