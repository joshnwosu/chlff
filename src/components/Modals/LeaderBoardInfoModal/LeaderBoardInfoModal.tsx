import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleShowLeadeBoardInfoModal } from '../../../features/control/controlSlice';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import Overlay from '../../Shared/Overlay/Overlay';
import classes from './LeaderBoardInfoModal.module.css';

export default function LeaderBoardInfoModal() {
  const dispatch = useAppDispatch();
  const { showLeaderBoardInfoModal, selectedLeaderBoard } = useAppSelector(
    (state) => state.control
  );

  const handleClose = () => {
    dispatch(toggleShowLeadeBoardInfoModal(false));
  };

  return (
    <Overlay opened={showLeaderBoardInfoModal}>
      <div className={classes.centeredView}>
        <div className={classes.container}>
          <div className={classes.left_panel}>
            <div className={classes.profile}>
              <div className={classes.profile_level}>
                <p className={classes.profile_level_text}>Lv 1</p>
              </div>
            </div>

            <div className={classes.profile_info}>
              <p className={classes.profile_name}>
                {selectedLeaderBoard.displayName}
              </p>
              <p className={classes.profile_year}>
                Year {selectedLeaderBoard.year}
              </p>
            </div>

            <div className={classes.game_info}>
              <div className={classes.game_time}>
                <p className={classes.game_label}>Time Played</p>
                <p className={classes.game_value}>
                  {selectedLeaderBoard.totalTimePlayed}
                </p>
              </div>
              <div className={classes.game_mission}>
                <p className={classes.game_label}>Successful Mission</p>
                <p className={classes.game_value}>
                  {selectedLeaderBoard.totalSuccessfulMissions}
                </p>
              </div>
            </div>

            {/* <button></button> */}
            <div className={classes.btn}>
              <CustomButton color='red' onClick={handleClose}>
                Close
              </CustomButton>
            </div>
          </div>
          <div className={classes.right_panel}></div>
        </div>
      </div>
    </Overlay>
  );
}
