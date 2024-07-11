import classes from './ActionCenter.module.css';
import LeaderBoard from '../../components/LeaderBoard/LeaderBoard';
import PageWrapper from '../../components/Shared/PageWrapper/PageWrapper';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleSelectLevelModal } from '../../features/control/controlSlice';
import UserInfo from '../../components/UserInfo/UserInfo';

const ActionCenter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedYear } = useAppSelector((state) => state.control);

  const handleClick = () => {
    dispatch(toggleSelectLevelModal(true));
  };

  const options = [
    {
      name: 'ADDITION',
      color: 'rgba(198, 81, 149, 0.9)',
      img: '/assets/phonics_image1.jpeg',
      link: 'addition',
      disabled: false,
    },
    {
      name: 'SUBTRACTION',
      color: 'rgba(17, 169, 182, 0.9)',
      img: '/assets/punctuation_image_for_children1.jpeg',
      link: 'subtraction',
      disabled: false,
    },
    {
      name: 'MULTIPLICATION',
      color: 'rgba(70, 107, 163, 0.9)',
      img: '/assets/car_race1.jpeg',
      link: 'times-table',
      disabled: selectedYear === 1,
    },

    {
      name: 'DIVISION',
      color: 'rgba(245, 178, 22, 0.9)',
      img: '/assets/spelling_image1.jpeg',
      link: 'division',
      disabled: selectedYear === 1,
    },
  ];

  return (
    <PageWrapper>
      <div className={classes.actionWrapper}>
        <div className={classes.title}>
          <h1>Year {selectedYear} Action Center</h1>
        </div>

        <div className={classes.actionCenter}>
          <div className={classes.actionCenterLeft}>
            {true && <LeaderBoard />}
          </div>
          <div className={classes.actionCenterMiddle}>
            <div className={classes.actionCenterGameCardContainer}>
              {options.map((item, index) => (
                <div
                  className={`${classes.actionCenterGameCard} ${
                    item.disabled && classes.actionCenterGameCardDisabled
                  }`}
                  key={index.toString()}
                  onClick={handleClick}
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
