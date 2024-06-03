import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './AuthRoutes';
import Root from '../components/Root/Root';
import Login from '../views/Auth/Login/Login';

export default function AppRoutes() {
  const isAuthenticated = true;

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
        />

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
