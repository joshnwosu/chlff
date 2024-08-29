import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  toggleGameModeModal,
  toggleGameSelectModal,
} from '../../../features/control/controlSlice';
import Overlay from '../../Shared/Overlay/Overlay';
import classes from './SelectGame.module.css';
import GamePopupModal from '../GamePopupModal/GamePopupModal';
import { useNavigate } from 'react-router-dom';
import { setSelectedGame } from '../../../features/game/gameSlice';

interface Props {
  name: string;
  image: string;
}

const games: Props[] = [
  { name: 'Car Race', image: 'assets/thumb/car.png' },
  { name: 'Picture Puzzle', image: 'assets/thumb/puzzle.png' },
  //   { name: 'Street Racer', image: 'assets/car/car3.png' },
  { name: 'Fishing', image: 'assets/fish/player1-right.gif' },
];

export default function SelectGame() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { gameSelectModal } = useAppSelector((state) => state.control);

  const handleClose = () => {
    dispatch(toggleGameSelectModal(!gameSelectModal));
  };

  const handleModeSelection = (game: Props) => {
    handleClose();
    console.log('game: ', game);
    dispatch(setSelectedGame(game));

    if (game.name === 'Picture Puzzle') {
      navigate('/picture-puzzle');
    } else if (game.name === 'Car Race') {
      dispatch(toggleGameModeModal(true));
    } else if (game.name === 'Fishing') {
      dispatch(toggleGameModeModal(true));
    }
  };

  return (
    <Overlay opened={gameSelectModal} close={handleClose}>
      <GamePopupModal title='Select Game'>
        <div className={classes.cardsContainer}>
          {games.map((game) => (
            <div
              key={game.name}
              onClick={() => handleModeSelection(game)}
              className={classes.cardWrapper}
            >
              <div className={classes.card}>
                <img src={game.image} />
              </div>
              <p className={classes.cardTitle}>{game.name}</p>
            </div>
          ))}
        </div>
      </GamePopupModal>
    </Overlay>
  );
}
