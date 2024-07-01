import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleGameModeModal } from '../../../features/control/controlSlice';
import Overlay from '../../Shared/Overlay/Overlay';
import classes from './GameModeModal.module.css';

interface Props {
  name: string;
  image?: string;
}

const cities: Props[] = [
  { name: 'Paris', image: 'assets/mode/paris.png' },
  { name: 'London', image: 'assets/mode/london.png' },
  { name: 'Tokyo', image: 'assets/mode/tokyo.png' },
  { name: 'New York', image: 'assets/mode/paris.png' },
];

const times: Props[] = [
  { name: 'Day', image: 'assets/mode/paris.png' },
  { name: 'Evening', image: 'assets/mode/paris.png' },
  { name: 'Night', image: 'assets/mode/night.png' },
];
const weathers: Props[] = [
  { name: 'Rain', image: 'assets/mode/paris.png' },
  { name: 'Snow', image: 'assets/mode/paris.png' },
];

export default function GameModeModal() {
  const dispatch = useAppDispatch();
  const { gameModeModal } = useAppSelector((state) => state.control);

  const handleClose = () => {
    dispatch(toggleGameModeModal(!gameModeModal));
    setSelectedCity(null);
    setSelectedTime(null);
    setSelectedWeather(null);
  };

  const [selectedCity, setSelectedCity] = useState<Props | null>(null);
  const [selectedTime, setSelectedTime] = useState<Props | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<Props | null>(null);
  const [gameReady, setGameReady] = useState<boolean>(false);

  const handleCitySelection = (city: Props) => {
    setSelectedCity(city);
    setSelectedTime(null);
    setSelectedWeather(null);
    setGameReady(false);
  };

  const handleTimeSelection = (time: Props) => {
    setSelectedTime(time);
    setSelectedWeather(null);
    setGameReady(false);
  };

  const handleWeatherSelection = (weather: Props) => {
    setSelectedWeather(weather);
    setGameReady(true);
  };

  const handleStartGame = () => {
    console.log('Game started with settings:', {
      city: selectedCity,
      time: selectedTime,
      weather: selectedWeather,
    });
    // Add your game start logic here
  };

  return (
    <Overlay opened={gameModeModal} close={handleClose}>
      <div className={classes.container}>
        <div className={classes.selectContainer}>
          <div className={classes.selectHeader}>
            <p className={classes.selectHeaderTitle}>Game Mode</p>
          </div>
          <div className={classes.selectContent}>
            <div className={classes.selectScroll}>
              <div className={classes.cardsContainer}>
                <div className={classes.flexContent}>
                  {cities.map((city) => (
                    <div
                      key={city.name}
                      onClick={() => handleCitySelection(city)}
                      className={classes.cardWrapper}
                    >
                      <p className={classes.cardTitle}>{city.name}</p>
                      <div
                        className={classes.card}
                        style={{
                          borderColor:
                            city.name === selectedCity?.name
                              ? '#efad23'
                              : 'transparent',
                        }}
                      >
                        <img
                          src={city.image}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className={classes.flexContent}>
                  {times.map((time) => (
                    <div
                      key={time.name}
                      onClick={() => handleTimeSelection(time)}
                      className={classes.cardWrapper}
                    >
                      <p className={classes.cardTitle}>{time.name}</p>
                      <div
                        className={classes.card}
                        style={{
                          borderColor:
                            time.name === selectedTime?.name
                              ? '#efad23'
                              : 'transparent',
                        }}
                      >
                        <img
                          src={time.image}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {selectedCity && selectedTime && (
                  <div className={classes.flexContent}>
                    {weathers.map((weather) => (
                      <div
                        key={weather.name}
                        onClick={() => handleWeatherSelection(weather)}
                        className={classes.cardWrapper}
                      >
                        <p className={classes.cardTitle}>{weather.name}</p>
                        <div
                          className={classes.card}
                          style={{
                            borderColor:
                              weather.name === selectedWeather?.name
                                ? '#efad23'
                                : 'transparent',
                          }}
                        >
                          <img
                            src={weather.image}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {gameReady && (
                  <div>
                    <button onClick={handleStartGame}>Play</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
