import classes from './ActionCenter.module.css';
import LeaderBoard from '../../components/LeaderBoard/LeaderBoard';
import PageWrapper from '../../components/Shared/PageWrapper/PageWrapper';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  toggleGameSelectModal,
  toggleSelectGenderModal,
  // toggleSelectLevelModal,
} from '../../features/control/controlSlice';
import UserInfo from '../../components/UserInfo/UserInfo';
import { GameOptions } from '../../interfaces/data';
import { setSelectedOperator } from '../../features/game/gameSlice';
import { Link } from 'react-router-dom';
// import UserDataBanner from '../../components/Shared/UserDataBanner/UserDataBanner';
import { useState } from 'react';
import Overlay from '../../components/Shared/Overlay/Overlay';
import CustomModalWrapper from '../../components/Shared/CustomModalWrapper/CustomModalWrapper';
import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import TitleBanner from '../../components/Shared/TitleBanner/TitleBanner';

const ActionCenter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedYear } = useAppSelector((state) => state.control);
  const { gameOpeartors } = useAppSelector((state) => state.game);
  const { user } = useAppSelector((state) => state.user);

  const [showModal, setShowModal] = useState(false);

  const handleClick = (item: GameOptions) => {
    if (user && user?.character) {
      // dispatch(toggleSelectLevelModal(true));
      dispatch(setSelectedOperator(item));

      dispatch(toggleGameSelectModal(true));
    } else {
      setShowModal(true);
    }
  };

  return (
    <PageWrapper>
      {/* <UserDataBanner /> */}

      <div className={classes.actionWrapper}>
        <div className={classes.actionCenter}>
          {/* <div className={classes.actionCenterLeft}>
            {true && <LeaderBoard />}
          </div> */}

          <LeaderBoard />
          <div className={classes.actionCenterMiddle}>
            <TitleBanner title={`Year ${user?.year} Action Center`} />

            <div className={classes.actionCenterGameCardContainer}>
              {gameOpeartors?.map((item, index) => (
                <div
                  className={`${classes.actionCenterGameCard} ${
                    user?.year === 1 &&
                    index > 1 &&
                    classes.actionCenterGameCardDisabled
                  }`}
                  key={index.toString()}
                  onClick={() => {
                    // handleClick(item);
                    if (user?.year !== 1 || index <= 1) {
                      handleClick(item); // Prevent click if year is 1 and index > 1
                    }
                  }}
                >
                  {user?.year === 1 && index > 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        // backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        top: 0,
                        left: 0,
                        zIndex: 4,
                      }}
                      title={`Not available for year ${user?.year}`}
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

                    {index === 2 && selectedYear === 4 && <RenderMTC />}
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

      <Overlay opened={showModal}>
        <CustomModalWrapper title='Please choose your avatar!'>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div>
              <CustomButton
                color='green'
                onClick={() => {
                  dispatch(toggleSelectGenderModal(true));
                  setShowModal(false);
                }}
              >
                Choose Avatar
              </CustomButton>
            </div>

            <div>
              <CustomButton color='red' onClick={() => setShowModal(false)}>
                Close
              </CustomButton>
            </div>
          </div>
        </CustomModalWrapper>
      </Overlay>
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
