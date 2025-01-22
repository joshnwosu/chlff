import { useAppDispatch } from '../../app/hooks';
import { toggleShowLeadeBoardInfoModal } from '../../features/control/controlSlice';
import './LeaderBoard.css';
import { motion } from 'framer-motion';

const players = [
  { first_name: 'Ziyech', last_name: 'Hakim', level: 5 },
  { first_name: 'Mount', last_name: 'Mason', level: 4 },
  { first_name: 'Mainoo', last_name: 'Kobbie', level: 3 },
  { first_name: 'Garnacho', last_name: 'Alejandro', level: 2 },
  { first_name: 'Ziyech', last_name: 'Hakim', level: 5 },
  { first_name: 'Mount', last_name: 'Mason', level: 4 },
  { first_name: 'Mainoo', last_name: 'Kobbie', level: 3 },
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

const LeaderBoard: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleShowLeadeBoardInfoModal(true));
  };

  return (
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
            onClick={handleClick}
          >
            <div className='leader-board-player-info'>
              <div className='leader-board-player-avatar'></div>
              <div className='leader-board-player-content'>
                <p className='leader-board-player-name'>{item.first_name}</p>
                <p className='leader-board-player-level'>Level {item.level}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
