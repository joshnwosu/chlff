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
import ElementWrapper from '../../Shared/ElementWrapper/ElementWrapper';
import { getCloudinaryImage } from '../../../utils/cloudinaryUtils';

interface Props {
  name: string;
  image: string;
}

const carModes: Props[] = [
  {
    name: 'Field',
    image: getCloudinaryImage('grass-road_hkxcu7') as string,
  },
  { name: 'Snow', image: getCloudinaryImage('snow-road_yz0wkk') as string },
  { name: 'Desert', image: getCloudinaryImage('desert-road_xfcmzx') as string },
];

const carTwoModes: Props[] = [
  { name: 'Tokyo', image: 'assets/car/street_grass.jpg' },
  { name: 'Paris', image: 'assets/car/street_snow.jpg' },
  { name: 'New York', image: 'assets/car/street_desert.jpg' },
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

  const modes =
    selectedGame?.name === 'Fishing'
      ? fishModes
      : selectedGame?.name === 'Car Race'
      ? carModes
      : selectedGame?.name === 'Street Racer'
      ? carTwoModes
      : carModes;

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
    } else if (selectedGame?.name === 'Street Racer') {
      navigate('/car-race-two');
    } else {
      navigate('/fishing');
    }
  };

  const handleGoBack = () => {
    handleClose();
    dispatch(toggleGameSelectModal(true));
  };

  // const imageUrl = getCloudinaryImage(gameMode?.mode.image, {
  //   width: 800,
  //   // height: 400,
  // });

  return (
    <Overlay opened={gameModeModal} close={handleClose}>
      <div
        style={{
          // backgroundColor: 'red',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ElementWrapper title='Game Mode' width={400} height={380}>
          <div
            className={classes.cardsContainer}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
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

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div style={{ marginTop: 20 }}>
              <CustomButton onClick={handleGoBack}>{'< Go Back'}</CustomButton>
            </div>
          </div>
        </ElementWrapper>
      </div>

      {false && (
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
      )}
    </Overlay>
  );
}
