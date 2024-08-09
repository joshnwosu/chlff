import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleGameModeModal } from '../../../features/control/controlSlice';
import Overlay from '../../Shared/Overlay/Overlay';
import classes from './GameModeModal.module.css';
import { useNavigate } from 'react-router-dom';
import { setGameMode } from '../../../features/game/gameSlice';
import GamePopupModal from '../GamePopupModal/GamePopupModal';

interface Props {
  name: string;
  image: string;
}

const modes: Props[] = [
  { name: 'Field', image: 'assets/car/street_grass.jpg' },
  { name: 'Snow', image: 'assets/car/street_snow.jpg' },
  { name: 'Desert', image: 'assets/car/street_desert.jpg' },
];

export default function GameModeModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { gameModeModal } = useAppSelector((state) => state.control);

  const handleClose = () => {
    dispatch(toggleGameModeModal(!gameModeModal));
  };

  const handleModeSelection = (mode: Props) => {
    dispatch(
      setGameMode({
        mode,
      })
    );

    handleClose();
    navigate('/game');
  };

  return (
    <Overlay opened={gameModeModal} close={handleClose}>
      <GamePopupModal title='Game Mode'>
        <div className={classes.cardsContainer}>
          {modes.map((mode) => (
            <div
              key={mode.name}
              onClick={() => handleModeSelection(mode)}
              className={classes.cardWrapper}
            >
              <div className={classes.card}>
                <img
                  src={mode.image}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <p className={classes.cardTitle}>{mode.name}</p>
            </div>
          ))}
        </div>
      </GamePopupModal>
    </Overlay>
  );
}
