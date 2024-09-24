import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';


const imageUrls = [
  '/assets/bear-profile-photo.png',
  '/assets/avatar/african avatar.png',
  '/assets/avatar/african avatar.png',
  '/assets/avatar/boy avatar.png',
  '/assets/avatar/cute avatar.png',
  '/assets/avatar/excited avatar.png',
  '/assets/avatar/fashion boy.png',
  '/assets/avatar/girl avatar.png',
  '/assets/avatar/glass-girl avatar.png',
  '/assets/avatar/teacher avatar.png',
];

const backgroundColors = [
  'bg-blue-400',
  'bg-green-400',
  'bg-red-400',
  'bg-yellow-400',
];

const players = [
  { first_name: 'Ziyech', last_name: 'Hakim', level: 5 },
  { first_name: 'Mount', last_name: 'Mason', level: 4 },
  { first_name: 'Mainoo', last_name: 'Kobbie', level: 3 },
  { first_name: 'Garnacho', last_name: 'Alejandro', level: 2 },
  { first_name: 'Ziyech', last_name: 'Hakim', level: 5 },
  { first_name: 'Mount', last_name: 'Mason', level: 4 },
  { first_name: 'Mainoo', last_name: 'Kobbie', level: 3 },
  { first_name: 'Garnacho', last_name: 'Alejandro', level: 2 },
];

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

const Leaderboard = () => {
  const [playerImages, setPlayerImages] = useState<string[]>([]);
  const [playerBackgroundColors, setPlayerBackgroundColors] = useState<string[]>([]);

  useEffect(() => {
    const images = players.map(() => imageUrls[Math.floor(Math.random() * imageUrls.length)]);
    const colors = players.map(() => backgroundColors[Math.floor(Math.random() * backgroundColors.length)]);
    setPlayerImages(images);
    setPlayerBackgroundColors(colors);
  }, []);

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
