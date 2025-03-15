// import { useEffect, useMemo, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import {
//   setSelectedLeaderBoard,
//   toggleShowLeadeBoardInfoModal,
// } from '../../features/control/controlSlice';
// import './LeaderBoard.css';
// import { motion } from 'framer-motion';
// import { renderAvatar } from '../../utils/renderAvatar';
// import { LeaderBoardEntry } from '../../services/leaderBoardService';

// interface LeaderBoardProps {
//   type?: 'fish' | 'car' | 'both';
// }

// const variants = {
//   open: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       y: { stiffness: 1000, velocity: -100 },
//     },
//   },
//   closed: {
//     y: 50,
//     opacity: 0,
//     transition: {
//       y: { stiffness: 1000 },
//     },
//   },
// };

// const getLeaderboard = (
//   players: LeaderBoardEntry[],
//   type: string
// ): LeaderBoardEntry[] => {
//   // Filter based on type if not 'both'
//   // const filteredPlayers =
//   //   type === 'both'
//   //     ? players
//   //     : players.filter((player) => player.type === type);

//   // Filter out players who haven't played
//   const activePlayers = players.filter(
//     (player) => player.totalSuccessfulMissions > 0 || player.totalTimePlayed > 0
//   );

//   // Sort players
//   const sortedPlayers = activePlayers.sort((a, b) => {
//     // Primary sort: totalSuccessfulMissions (descending)
//     if (b.totalSuccessfulMissions !== a.totalSuccessfulMissions) {
//       return b.totalSuccessfulMissions - a.totalSuccessfulMissions;
//     }
//     // Secondary sort: totalTimePlayed (ascending)
//     return a.totalTimePlayed - b.totalTimePlayed;
//   });

//   // Return top 10 (or 8 for fish tab)
//   return sortedPlayers.slice(0, type === 'fish' ? 8 : 10);
// };

// const LeaderBoard: React.FC<LeaderBoardProps> = ({ type = 'both' }) => {
//   const dispatch = useAppDispatch();
//   const { leaderboard } = useAppSelector((state) => state.leaderBoard);

//   const tabs = ['Car', 'Fish'];
//   const [activeIndex, setActiveIndex] = useState(0);

//   // Use useMemo to prevent unnecessary recalculations
//   const filteredLeaderboard = useMemo(() => {
//     const currentType =
//       type === 'both' ? (activeIndex === 0 ? 'car' : 'fish') : type;
//     return getLeaderboard(leaderboard, currentType);
//   }, [leaderboard, type, activeIndex]);

//   // For debugging
//   useEffect(() => {
//     console.log('The leader board info: ', filteredLeaderboard);
//   }, [filteredLeaderboard]);

//   return (
//     <div className='leader-board'>
//       <p className='leader-board-title'>LeaderBoard</p>

//       {type === 'both' && (
//         <div className='tab-header'>
//           {tabs.map((tab, index) => (
//             <button
//               key={index}
//               className={`tab-button ${activeIndex === index ? 'active' : ''}`}
//               onClick={() => setActiveIndex(index)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       )}

//       <div className='leader-board-players'>
//         {!filteredLeaderboard.length ? (
//           <p className='leader-empty'>No player on the Leader Board</p>
//         ) : (
//           filteredLeaderboard.map((item, index) => (
//             <motion.div
//               variants={variants}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className='leader-board-player'
//               key={item.uid || index.toString()} // Use item.id if available
//               onClick={() => {
//                 dispatch(toggleShowLeadeBoardInfoModal(true));
//                 dispatch(setSelectedLeaderBoard(item));
//               }}
//             >
//               <div className='leader-board-player-info'>
//                 <p className='leader-board-player-index'>{index + 1}</p>
//                 <div className='leader-board-player-avatar'>
//                   {item.character && (
//                     <img
//                       src={renderAvatar(item.gender, item.skin, item.character)}
//                       style={{
//                         objectFit: 'cover',
//                         objectPosition: 'center',
//                       }}
//                       alt={`${item.displayName}'s avatar`}
//                     />
//                   )}
//                 </div>
//                 <div className='leader-board-player-content'>
//                   <p className='leader-board-player-name'>{item.displayName}</p>
//                   <p className='leader-board-player-level'>
//                     Level {item.level || 1}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default LeaderBoard;

import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setCurrentLeaderBoardTabType,
  setSelectedLeaderBoard,
  toggleShowLeadeBoardInfoModal,
} from '../../features/control/controlSlice';
import './LeaderBoard.css';
import { motion } from 'framer-motion';
import { renderAvatar } from '../../utils/renderAvatar';
import { LeaderBoardEntry } from '../../services/leaderBoardService';

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

const getLeaderboard = (
  players: LeaderBoardEntry[],
  type: 'fish' | 'car'
): LeaderBoardEntry[] => {
  // Filter out players who haven't played the specific game
  const activePlayers = players.filter((player) => {
    const gameLevel =
      type === 'fish' ? player.fishGameInfo : player.carGameInfo;
    return (
      gameLevel?.totalSuccessfulMissions > 0 || gameLevel?.totalTimePlayed > 0
    );
  });

  // Sort players based on game-specific stats
  const sortedPlayers = activePlayers.sort((a, b) => {
    const aLevel = type === 'fish' ? a.fishGameInfo : a.carGameInfo;
    const bLevel = type === 'fish' ? b.fishGameInfo : b.carGameInfo;

    // Primary sort: totalSuccessfulMissions (descending)
    if (bLevel.totalSuccessfulMissions !== aLevel.totalSuccessfulMissions) {
      return bLevel.totalSuccessfulMissions - aLevel.totalSuccessfulMissions;
    }
    // Secondary sort: totalTimePlayed (ascending)
    return aLevel.totalTimePlayed - bLevel.totalTimePlayed;
  });

  // Return top 10 (or 8 for fish tab)
  return sortedPlayers.slice(0, type === 'fish' ? 8 : 10);
};

const LeaderBoard: React.FC<LeaderBoardProps> = ({ type = 'both' }) => {
  const dispatch = useAppDispatch();
  const { leaderboard } = useAppSelector((state) => state.leaderBoard);

  const tabs = ['Car', 'Fish'];
  const [activeIndex, setActiveIndex] = useState(0);

  // Determine current game type based on tab or prop
  const currentType = useMemo(() => {
    return type === 'both' ? (activeIndex === 0 ? 'car' : 'fish') : type;
  }, [type, activeIndex]);

  // Use useMemo to prevent unnecessary recalculations
  const filteredLeaderboard = useMemo(() => {
    return getLeaderboard(leaderboard, currentType);
  }, [leaderboard, currentType]);

  // For debugging
  useEffect(() => {
    console.log('The leader board info: ', filteredLeaderboard);
  }, [filteredLeaderboard]);

  // Helper to format time played (in seconds) to a readable string
  const formatTimePlayed = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className='leader-board'>
      <p className='leader-board-title'>LeaderBoard</p>

      {type === 'both' && (
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
        {!filteredLeaderboard.length ? (
          <p className='leader-empty'>No player on the Leader Board</p>
        ) : (
          filteredLeaderboard.map((item, index) => {
            const gameLevel =
              currentType === 'fish' ? item.fishGameInfo : item.carGameInfo;
            return (
              <motion.div
                variants={variants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className='leader-board-player'
                key={item.uid || index.toString()}
                onClick={() => {
                  dispatch(toggleShowLeadeBoardInfoModal(true));
                  dispatch(setSelectedLeaderBoard(item));
                  dispatch(setCurrentLeaderBoardTabType(currentType));
                  console.log('ITEM: ', currentType);
                }}
              >
                <div className='leader-board-player-info'>
                  <p className='leader-board-player-index'>{index + 1}</p>
                  <div className='leader-board-player-avatar'>
                    {item.character && (
                      <img
                        src={renderAvatar(
                          item.gender,
                          item.skin,
                          item.character
                        )}
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                        alt={`${item.displayName}'s avatar`}
                      />
                    )}
                  </div>
                  <div className='leader-board-player-content'>
                    <p className='leader-board-player-name'>
                      {item.displayName}
                    </p>
                    <p className='leader-board-player-level'>
                      Level {gameLevel.level}
                    </p>
                    {false && (
                      <p className='leader-board-player-stats'>
                        Missions: {gameLevel.totalSuccessfulMissions} | Time:{' '}
                        {formatTimePlayed(gameLevel.totalTimePlayed)}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;
