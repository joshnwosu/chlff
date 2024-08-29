import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  toggleGameModeModal,
  toggleGameSelectModal,
} from '../../../features/control/controlSlice';
import Overlay from '../../Shared/Overlay/Overlay';
import classes from './GameModeModal.module.css';
import { useNavigate } from 'react-router-dom';
import { setGameMode } from '../../../features/game/gameSlice';
import GamePopupModal from '../GamePopupModal/GamePopupModal';
import CustomButton from '../../Shared/CustomButton/CsutomButton';

interface Props {
  name: string;
  image: string;
}

const carModes: Props[] = [
  { name: 'Field', image: 'assets/car/street_grass.jpg' },
  { name: 'Snow', image: 'assets/car/street_snow.jpg' },
  { name: 'Desert', image: 'assets/car/street_desert.jpg' },
];

const fishModes: Props[] = [
  { name: 'Sea Surface', image: 'assets/fish/background1.png' },
  { name: 'Open Ocean', image: 'assets/fish/background2.png' },
  { name: 'Under The Sea', image: 'assets/fish/background3.png' },
];

export default function GameModeModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { gameModeModal } = useAppSelector((state) => state.control);
  const { selectedGame } = useAppSelector((state) => state.game);

  const modes = selectedGame?.name === 'Fishing' ? fishModes : carModes;

  const handleClose = () => {
    dispatch(toggleGameModeModal(!gameModeModal));
  };

  const handleModeSelection = (mode: Props) => {
    handleClose();
    dispatch(
      setGameMode({
        mode,
      })
    );

    if (selectedGame?.name === 'Car Race') {
      navigate('/game');
    } else {
      navigate('/fishing');
    }
  };

  const handleGoBack = () => {
    handleClose();
    dispatch(toggleGameSelectModal(true));
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

        <div style={{ marginTop: 20 }}>
          <CustomButton onClick={handleGoBack}>{'< Go Back'}</CustomButton>
        </div>
      </GamePopupModal>
    </Overlay>
  );
}
