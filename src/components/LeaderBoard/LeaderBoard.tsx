import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setSelectedLeaderBoard,
  toggleShowLeadeBoardInfoModal,
} from '../../features/control/controlSlice';
import './LeaderBoard.css';
import { motion } from 'framer-motion';
import { renderAvatar } from '../../utils/renderAvatar';

interface LeaderBoardProps {
  type?: 'fish' | 'car' | 'both';
}

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const LeaderBoard: React.FC<LeaderBoardProps> = ({ type = 'both' }) => {
  const dispatch = useAppDispatch();

  const { leaderboard } = useAppSelector((state) => state.leaderBoard);

  const tabs = ['Car', 'Fish'];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.log('The leader board info: ', leaderboard);
  }, [leaderboard]);

  return (
    <div className='leader-board'>
      <p className='leader-board-title'>LeaderBoard</p>

      {type == 'both' && (
        <div className='tab-header'>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-button ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <div className='leader-board-players'>
        {!leaderboard.length ? (
          <>
            <div>No player on the Leader Board</div>
          </>
        ) : (
          <>
            {leaderboard
              .slice(0, activeIndex === 1 ? 8 : 10)
              .map((item, index) => (
                <motion.div
                  variants={variants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className='leader-board-player'
                  key={index.toString()}
                  onClick={() => {
                    dispatch(toggleShowLeadeBoardInfoModal(true));
                    dispatch(setSelectedLeaderBoard(item));
                    // console.log('DATA: ', item);
                  }}
                >
                  <div className='leader-board-player-info'>
                    <p className='leader-board-index'>{index + 1}</p>
                    <div className='leader-board-player-avatar'>
                      {item.character && (
                        <img
                          src={`${renderAvatar(
                            item.gender,
                            item.skin,
                            item.character
                          )}`}
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                        />
                      )}
                    </div>
                    <div className='leader-board-player-content'>
                      <p className='leader-board-player-name'>
                        {item.displayName}
                      </p>
                      <p className='leader-board-player-level'>
                        Level {item.level || 1}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;
