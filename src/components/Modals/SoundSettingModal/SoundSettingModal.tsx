import classes from './SoundSettingModal.module.css';
import Overlay from '../../Shared/Overlay/Overlay';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleShowSoundSetting } from '../../../features/control/controlSlice';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import { updateUserProfile } from '../../../features/auth/authSlice';
import { getUserProfile } from '../../../features/user/userSlice';
import { getLeaderBoard } from '../../../features/leaderBoard/leaderBoardSlice';
import { updateLeaderBoardService } from '../../../services/leaderBoardService';

export default function SoundSettingModal() {
  const dispatch = useAppDispatch();
  const { showSoundSettingModal } = useAppSelector((state) => state.control);
  const { user } = useAppSelector((state) => state.user);

  const handleClose = () => {
    dispatch(toggleShowSoundSetting(false));
  };

  const handleUpdateUser = async () => {
    if (user) {
      try {
        // Dispatch updateUserProfile and wait for it to complete
        const result = await dispatch(
          updateUserProfile({
            uid: user?.uid,
            updatedData: {
              displayName: 'Joshua',
              assessmentPassed: true,
            },
          })
        );

        // Check if updateUserProfile was successful
        if (updateUserProfile.fulfilled.match(result)) {
          console.log('User updated successfully:', result.payload);

          // Call getUserProfile after successful update
          dispatch(getUserProfile());
        } else {
          console.error('Failed to update user:', result.payload);
        }
      } catch (error) {
        console.error('Error while updating user:', error);
      }
    } else {
      console.log('No User Found:', user);
    }
  };

  const handleFetchLB = () => {
    dispatch(getLeaderBoard(1))
      .unwrap()
      .then((res) => console.log('Res: ', res));
  };

  const handleMissionCompletion = (userId: string) => {
    // Update the leaderboard
    updateLeaderBoardService(userId, {
      totalTimePlayed: 200,
      totalSuccessfulMissions: 500,
      year: 1,
    })
      .then(() => {
        console.log('Leaderboard updated successfully');
      })
      .catch((error) => {
        console.error('Error updating leaderboard: ', error);
      });
  };

  return (
    <Overlay opened={showSoundSettingModal}>
      <div className={classes.container}>
        <div className={classes.content}>
          <div></div>

          <CustomButton onClick={handleClose}>Close</CustomButton>

          <p
            style={{
              color: 'red',
            }}
          >
            {user?.displayName}
          </p>
          <CustomButton onClick={handleUpdateUser}>Update User</CustomButton>
          <CustomButton
            onClick={() => {
              if (user) {
                handleMissionCompletion(user?.uid);
              }
            }}
          >
            Mission Complete
          </CustomButton>
          <CustomButton onClick={handleFetchLB}>Fetch LB</CustomButton>
        </div>
      </div>
    </Overlay>
  );
}
