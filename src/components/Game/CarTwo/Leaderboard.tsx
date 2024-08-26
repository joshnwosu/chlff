import React from 'react';
import { motion } from 'framer-motion';

interface Player {
  first_name: string;
  last_name: string;
  level: number;
}

interface LeaderboardProps {
  players: Player[];
  playerImages: string[];
  playerBackgroundColors: string[];
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

const Leaderboard: React.FC<LeaderboardProps> = ({ players, playerImages, playerBackgroundColors }) => {
  return (
    <div className='h-[38rem] bg-blue-400 rounded-xl p-2 backdrop-blur-sm bg-opacity-10 z-10 backdrop shadow-xl text-gray-800'>
      <div className='leader-board'>
        <p className='leader-board-title'>LeaderBoard</p>
        <div className='leader-board-players'>
          {players.map((item, index) => (
            <motion.div
              variants={variants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className='leader-board-player'
              key={index.toString()}
            >
              <div className='mx-auto w-full'>
                <div className='flex items-center py-1 px-1'>
                  <span className={`w-10 h-10 rounded-full object-cover ${playerBackgroundColors[index]} flex justify-center items-center`}>
                    <img src={playerImages[index]} alt={`${item.first_name}'s profile`} className='h-9' />
                  </span>
                  <div className='flex items-center px-2'>
                    <p className='text-lg mr-4 text-black'>{item.first_name}</p>
                    <p className='text-sm text-black'>Lv{index + 1}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
