import classes from './Root.module.css';
import { Outlet, useLocation } from 'react-router-dom';
import CongratulationModal from '../Modals/CongratulationModal/CongratulationModal';
import Header from '../Layout/Header/Header';
import SelectAssessmentYear from '../Modals/AssessmentYearModal/AssessmentYearModal';
import GameModeModal from '../Modals/GameModeModal/GameModeModal';
import SelectGame from '../Modals/SelectGame/SelectGame';
import SelectGenderModal from '../Modals/SelectGenderModal/SelectGenderModal';
import Footer from '../Layout/Footer/Footer';
import LeaderBoardInfoModal from '../Modals/LeaderBoardInfoModal/LeaderBoardInfoModal';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { getUserProfile } from '../../features/user/userSlice';
import SoundSettingModal from '../Modals/SoundSettingModal/SoundSettingModal';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../configs/firebase';
import { getLeaderBoard } from '../../features/leaderBoard/leaderBoardSlice';
import { logout } from '../../features/auth/authSlice';

const Root: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true); // Track auth loading state

  const location = useLocation();

  // Check the current route array
  const shouldShowBanner = ['/assessment', '/action-center'].includes(
    location.pathname
  );

  const onLoad = async () => {
    dispatch(getLeaderBoard(1));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, fetch their profile
        dispatch(getUserProfile())
          .unwrap()
          .catch((error) =>
            console.error('Failed to fetch user profile:', error)
          );

        // call onload()
        onLoad();
      } else {
        console.log('No user is currently authenticated');
        dispatch(logout());
      }
      setLoading(false); // Authentication check complete
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [dispatch]); // Ensures this runs only once

  if (loading) {
    // Optionally, show a loading spinner or screen while waiting
    return <div className={classes.wrapper}>Loading...</div>;
  }

  return (
    <>
      <div className={classes.wrapper}>
        <Header withBanner={shouldShowBanner} />
        <Outlet />
        <Footer />
      </div>

      <CongratulationModal />
      <SelectAssessmentYear />
      <GameModeModal />
      <SelectGame />
      <SelectGenderModal />
      <LeaderBoardInfoModal />
      <SoundSettingModal />
    </>
  );
};

export default Root;
