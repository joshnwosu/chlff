import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleShowLeadeBoardInfoModal } from '../../../features/control/controlSlice';
import { formatTime } from '../../../utils/formatTime';
import { renderAvatar } from '../../../utils/renderAvatar';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import Overlay from '../../Shared/Overlay/Overlay';
import classes from './LeaderBoardInfoModal.module.css';

export default function LeaderBoardInfoModal() {
  const dispatch = useAppDispatch();
  const {
    showLeaderBoardInfoModal,
    selectedLeaderBoard,
    currentLeaderBoardTabType,
  } = useAppSelector((state) => state.control);

  const handleClose = () => {
    dispatch(toggleShowLeadeBoardInfoModal(false));
  };

  const gameType =
    currentLeaderBoardTabType === 'fish'
      ? selectedLeaderBoard.fishGameInfo
      : selectedLeaderBoard.carGameInfo;

  return (
    <Overlay opened={showLeaderBoardInfoModal}>
      <div className={classes.centeredView}>
        <div className={classes.container}>
          <div className={classes.left_panel}>
            <div className={classes.profile}>
              <div className={classes.profile_avatar}>
                <img
                  src={`${renderAvatar(
                    selectedLeaderBoard.gender,
                    selectedLeaderBoard.skin,
                    selectedLeaderBoard.character
                  )}`}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </div>

              <div className={classes.profile_level}>
                <p className={classes.profile_level_text}>
                  Lv {gameType?.level}
                </p>
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
                  {formatTime(gameType.totalTimePlayed) || '--:--'}
                </p>
              </div>
              <div className={classes.game_mission}>
                <p className={classes.game_label}>Successful Mission</p>
                <p className={classes.game_value}>
                  {gameType?.totalSuccessfulMissions}/
                  {Number(gameType?.totalFailedMissions) +
                    Number(gameType?.totalSuccessfulMissions)}
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
          {currentLeaderBoardTabType !== 'fish' && (
            <div className={classes.right_panel}></div>
          )}
        </div>
      </div>
    </Overlay>
  );
}
