// import { Navigate, Outlet } from 'react-router-dom';
// import { useAppSelector } from '../app/hooks';

// const ProtectedAssessmentRoute = () => {
//   const { user } = useAppSelector((state) => state.user);

//   // If the user has completed the assessment, redirect to the action center
//   if (user?.assessmentPassed) {
//     return <Navigate to='/action-center' replace />;
//   }

//   // Otherwise, allow access to the route
//   return <Outlet />;
// };

// export default ProtectedAssessmentRoute;

import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { useEffect, useState } from 'react';

const ProtectedAssessmentRoute = () => {
  const { user } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Simulate checking if user data is loaded
    if (user !== null) {
      setIsLoading(false); // User data is loaded
    }
  }, [user]);

  if (isLoading) {
    // Show a loading spinner or placeholder while checking user data
    return <div>Loading...</div>;
  }

  // If the user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to='/login' replace />;
  }

  // If the user has completed the assessment, redirect to the action center
  if (user.assessmentPassed) {
    return <Navigate to='/action-center' replace />;
  }

  // Otherwise, allow access to the route
  return <Outlet />;
};

export default ProtectedAssessmentRoute;
