import './LeaderBoard.css';

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

const LeaderBoard: React.FC = () => {
  return (
    <div className='leader-board'>
      <p className='leader-board-title'>LeaderBoard</p>
      <div className='leader-board-players'>
        {players.map((item, index) => (
          <div className='leader-board-player' key={index.toString()}>
            <div className='leader-board-player-avatar'></div>
            <div className='leader-board-player-info'>
              <p className='leader-board-player-name'>{item.first_name}</p>
              <p className='leader-board-player-level'>Lv{index + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
