import classes from './ActionCenter.module.css';
import LeaderBoard from '../../components/LeaderBoard/LeaderBoard';
import PageWrapper from '../../components/Shared/PageWrapper/PageWrapper';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleSelectLevelModal } from '../../features/control/controlSlice';
import UserInfo from '../../components/UserInfo/UserInfo';
import useSound from '../../utils/useSound';
import { GameOptions } from '../../interfaces/data';
import { setSelectedGame } from '../../features/game/gameSlice';
import { Link } from 'react-router-dom';

const ActionCenter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedYear } = useAppSelector((state) => state.control);
  const { gameOptions } = useAppSelector((state) => state.game);

  const handleClick = (item: GameOptions) => {
    dispatch(toggleSelectLevelModal(true));
    dispatch(setSelectedGame(item));
  };

  useSound('/sound/background-for-action-center.mp3');

  return (
    <PageWrapper>
      <div className={classes.actionWrapper}>
        <div className='flex justify-center z-20'>
        <div className='mr-4'>
          <Link
            to={'/car-race-two'}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 10,
              padding: '10px 20px',
              color: '#000000',
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Test Car Race
          </Link>
        </div>
        <div>
          <Link
            to={'/picture-puzzle'}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 10,
              padding: '10px 20px',
              color: '#000000',
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Test Picture Puzzle
          </Link>
        </div>        </div>
       
        <div className={classes.title}>
          <h1>Year {selectedYear} Action Center</h1>
        </div>

        <div className={classes.actionCenter}>
          <div className={classes.actionCenterLeft}>
            {true && <LeaderBoard />}
          </div>
          <div className={classes.actionCenterMiddle}>
            <div className={classes.actionCenterGameCardContainer}>
              {gameOptions?.map((item, index) => (
                <div
                  className={`${classes.actionCenterGameCard} ${item.disabled && classes.actionCenterGameCardDisabled
                    }`}
                  key={index.toString()}
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  {item.disabled && (
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        top: 0,
                        left: 0,
                        zIndex: 4,
                      }}
                    ></div>
                  )}
                  {item.img && (
                    <img
                      src={item.img}
                      className={classes.actionCenterGameCardImage}
                    />
                  )}
                  <div
                    className={classes.actionCenterGameCardOverlay}
                    style={{
                      backgroundImage: `linear-gradient(45deg, ${item.color} 35%, ${item.color} 35%, transparent)`,
                    }}
                  />
                  <div className={classes.actionCenterGameCardContent}>
                    <p>{item.name}</p>

                    {index === 2 && <RenderMTC />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={classes.actionCenterRight}>
            {true && <UserInfo />}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ActionCenter;

const RenderMTC = () => {
  return (
    <Link
      to={'/multiplication-tables-check'}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: '10px 20px',
        color: '#000000',
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      Take MTC Test!
    </Link>
  );
};
