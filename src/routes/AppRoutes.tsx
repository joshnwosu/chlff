import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Root from '../components/Root/Root';
import { ProctectedRoute } from './AuthRoutes';

export default function AppRoutes() {
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <ProctectedRoute isAuthenticated={isAuthenticated}>
              <Root />
            </ProctectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
