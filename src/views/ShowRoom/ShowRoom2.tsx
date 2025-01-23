/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import classes from './Showroom2.module.css';
// import { getAvatarsByGender, IAvatar } from '../../data/showroom/images';
import { useLocation } from 'react-router-dom';

interface Character {
  name: string;
  boy: { blackSkin: string; whiteSkin: string }; // Boy skins
  girl: { blackSkin: string; whiteSkin: string }; // Girl skins
}

const imagePath = '/assets/showroom/avatar';

const characters: Character[] = [
  {
    name: 'Police',
    boy: { blackSkin: 'police-bb.jpg', whiteSkin: 'police-wb.jpg' },
    girl: { blackSkin: 'police-bg.jpg', whiteSkin: 'police-wg.jpg' },
  },
  {
    name: 'Doctor',
    boy: { blackSkin: 'doctor-bb.jpg', whiteSkin: 'doctor-wb.jpg' },
    girl: { blackSkin: 'doctor-bg.jpg', whiteSkin: 'doctor-wg.jpg' },
  },
  {
    name: 'Engineer',
    boy: { blackSkin: 'engineer-bb.jpg', whiteSkin: 'engineer-wb.jpg' },
    girl: { blackSkin: 'engineer-bg.jpg', whiteSkin: 'engineer-wg.jpg' },
  },
  {
    name: 'Scientist',
    boy: { blackSkin: 'scientist-bb.jpg', whiteSkin: 'scientist-wb.jpg' },
    girl: { blackSkin: 'scientist-bg.jpg', whiteSkin: 'scientist-wg.jpg' },
  },
  {
    name: 'Firefighter',
    boy: { blackSkin: 'firefighter-bb.jpg', whiteSkin: 'firefighter-wb.jpg' },
    girl: { blackSkin: 'firefighter-bg.jpg', whiteSkin: 'firefighter-wg.jpg' },
  },
];

const RenderLockSvg = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
  >
    <path d='M17 9.761v-4.761c0-2.761-2.238-5-5-5-2.763 0-5 2.239-5 5v4.761c-1.827 1.466-3 3.714-3 6.239 0 4.418 3.582 8 8 8s8-3.582 8-8c0-2.525-1.173-4.773-3-6.239zm-8-4.761c0-1.654 1.346-3 3-3s3 1.346 3 3v3.587c-.927-.376-1.938-.587-3-.587s-2.073.211-3 .587v-3.587zm3 17c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm2-6c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2z' />
  </svg>
);

export default function ShowRoom2() {
  // const skinColors = ['black', 'white'];
  // const [characters, setCharacters] = useState<IAvatar[]>();

  const [selectedCharacter, setSelectedCharacter] = useState<Character>(
    characters[0]
  );

  const [skinColor, setSkinColor] = useState<'black' | 'white'>('black');
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');

  const location = useLocation();
  const routeValue = location.state || {};

  useEffect(() => {
    // Update gender based on routeValue
    if (routeValue.gender === 'boy' || routeValue.gender === 'girl') {
      setGender(routeValue.gender);
    }
    console.log('Route Value: ', routeValue);
  }, [routeValue]);

  // Create a dummy array of 10 objects
  const dummyArray = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    value: Math.floor(Math.random() * 100), // Random value for variety
  }));

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleSkinColorChange = (color: 'black' | 'white') => {
    setSkinColor(color);
  };

  return (
    <div className={classes.container}>
      <div className={classes.flexContainer}>
        <div className={classes.rightSection}>
          <div className={classes.rightSectionInner}>
            <div className={classes.characterThumbnail}>
              {characters?.map((character) => (
                <div
                  key={character.name}
                  className={classes.characterAvatar}
                  onClick={() => handleCharacterSelect(character)}
                >
                  <img
                    src={`${imagePath}/${
                      skinColor === 'black'
                        ? character[gender].blackSkin
                        : character[gender].whiteSkin
                    }`}
                    alt={character.name}
                    style={{
                      width: '80px',
                      // height: '50px',
                      // borderRadius: '8px',
                      // objectFit: 'contain',
                      // objectPosition: 'top',
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              className={classes.character}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src={`${imagePath}/${
                  skinColor === 'black'
                    ? selectedCharacter[gender].blackSkin
                    : selectedCharacter[gender].whiteSkin
                }`}
                alt={selectedCharacter.name}
                // style={{ height: '500px' }}
              />
            </div>
            <div className={classes.characterSkin}>
              <div
                className={classes.characterAvatar}
                style={{
                  backgroundColor: 'brown',
                }}
                onClick={() => handleSkinColorChange('black')}
              ></div>
              <div
                className={classes.characterAvatar}
                onClick={() => handleSkinColorChange('white')}
              ></div>
            </div>
          </div>

          <div className={classes.characterVehicle}>
            {characters?.map((character) => (
              <div
                key={character.name}
                className={classes.characterAvatar}
              ></div>
            ))}
          </div>
        </div>
        <div className={classes.leftSection}>
          <div className={classes.characterIventory}>
            <h1 className={classes.characterIventoryTitle}>FireFighter</h1>
            <div className={classes.characterIventoryProps}>
              {dummyArray.map((item) => (
                <div
                  key={item.id}
                  title={item.name}
                  className={classes.characterAvatar}
                >
                  <RenderLockSvg />
                </div>
              ))}
            </div>
          </div>

          <div className={classes.characterIventory}>
            <h1 className={classes.characterIventoryTitle}>Doctor</h1>
            <div className={classes.characterIventoryProps}>
              {dummyArray.map((item) => (
                <div
                  key={item.id}
                  title={item.name}
                  className={classes.characterAvatar}
                >
                  <RenderLockSvg />
                </div>
              ))}
            </div>
          </div>

          <div className={classes.characterIventory}>
            <h1 className={classes.characterIventoryTitle}>Police</h1>
            <div className={classes.characterIventoryProps}>
              {dummyArray.map((item) => (
                <div
                  key={item.id}
                  title={item.name}
                  className={classes.characterAvatar}
                >
                  <RenderLockSvg />
                </div>
              ))}
            </div>
          </div>

          <div className={classes.characterIventory}>
            <h1 className={classes.characterIventoryTitle}>Engineer</h1>
            <div className={classes.characterIventoryProps}>
              {dummyArray.map((item) => (
                <div
                  key={item.id}
                  title={item.name}
                  className={classes.characterAvatar}
                >
                  <RenderLockSvg />
                </div>
              ))}
            </div>
          </div>

          <div className={classes.characterIventory}>
            <h1 className={classes.characterIventoryTitle}>Scientist</h1>
            <div className={classes.characterIventoryProps}>
              {dummyArray.map((item) => (
                <div
                  key={item.id}
                  title={item.name}
                  className={classes.characterAvatar}
                >
                  <RenderLockSvg />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
