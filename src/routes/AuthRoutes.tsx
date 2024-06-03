import { Navigate } from 'react-router-dom';

interface RouteProps {
  children: any;
  isAuthenticated: boolean;
}

export function ProctectedRoute({ children, isAuthenticated }: RouteProps) {
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
}

export function PublicRoute({ children, isAuthenticated }: RouteProps) {
  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }
  return children;
}
