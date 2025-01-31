import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const ProtectedAssessmentRoute = () => {
  const { user } = useAppSelector((state) => state.user);

  // If the user has completed the assessment, redirect to the action center
  if (user?.assessmentPassed) {
    return <Navigate to='/action-center' replace />;
  }

  // Otherwise, allow access to the route
  return <Outlet />;
};

export default ProtectedAssessmentRoute;
