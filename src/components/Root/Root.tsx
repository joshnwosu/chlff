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
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserProfile } from '../../features/user/userSlice';
import SoundSettingModal from '../Modals/SoundSettingModal/SoundSettingModal';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../configs/firebase';
import { getLeaderBoard } from '../../features/leaderBoard/leaderBoardSlice';
import { logout } from '../../features/auth/authSlice';
import Overlay from '../Shared/Overlay/Overlay';
import LogoutConfirmModal from '../Modals/LogoutConfirmModal/LogoutConfirmModal';
import { _useAudio } from '../../hook/_useAudio';

const Root: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true); // Track auth loading state
  const { loading: userLoading } = useAppSelector((state) => state.user);
  const { selectedYear } = useAppSelector((state) => state.control);

  const location = useLocation();

  // Check the current route array
  const shouldShowBanner = [
    '/assessment',
    '/action-center',
    '/fishing',
    '/car-race',
  ].includes(location.pathname);

  const onLoad = async () => {
    if (selectedYear) {
      dispatch(getLeaderBoard(selectedYear));
    }
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

        onLoad();
      } else {
        console.log('No user is currently authenticated');
        dispatch(logout());
      }
      setLoading(false); // Authentication check complete
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]); // Ensures this runs only once

  _useAudio();

  return (
    <>
      <div className={classes.wrapper}>
        <Header withBanner={shouldShowBanner} />
        <div className={classes.outlet}>
          <Outlet />
        </div>
        {true && <Footer />}
      </div>

      <CongratulationModal />
      <SelectAssessmentYear />
      <GameModeModal />
      <SelectGame />
      <SelectGenderModal />
      <LeaderBoardInfoModal />
      <SoundSettingModal />
      <LogoutConfirmModal />

      <Overlay opened={loading || userLoading}>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            right: 0,

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p style={{ fontFamily: 'Sigmar One' }}>Loading...</p>
        </div>
      </Overlay>
    </>
  );
};

export default Root;
