import { Navigate } from 'react-router-dom';

interface RouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export function ProtectedRoute({ children, isAuthenticated }: RouteProps) {
  if (!isAuthenticated) {
    return <Navigate to='/welcome' replace />;
  }

  return children;
}

export function PublicRoute({ children, isAuthenticated }: RouteProps) {
  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }
  return children;
}
