/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import classes from './Showroom2.module.css';
// import { getAvatarsByGender, IAvatar } from '../../data/showroom/images';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateUserProfile } from '../../features/auth/authSlice';

interface Item {
  id: number;
  name: string;
  image: string;
  locked: boolean;
}

interface Character {
  name: string;
  boy: { blackSkin: string; whiteSkin: string }; // Boy skins
  girl: { blackSkin: string; whiteSkin: string }; // Girl skins
  items: Item[]; // Add items array
}

const imagePath = '/assets/showroom/avatar';

const characters: Character[] = [
  {
    name: 'Police',
    boy: { blackSkin: 'police-bb.jpg', whiteSkin: 'police-wb.jpg' },
    girl: { blackSkin: 'police-bg.jpg', whiteSkin: 'police-wg.jpg' },
    items: [
      { id: 1, name: 'Badge', image: 'police/props/1.png', locked: true },
      { id: 2, name: 'Hat', image: 'police/props/2.png', locked: true },
      { id: 3, name: 'Hat', image: 'police/props/3.png', locked: true },
      { id: 4, name: 'Hat', image: 'police/props/4.png', locked: true },
      { id: 5, name: 'Hat', image: 'police/props/5.png', locked: true },
      { id: 6, name: 'Hat', image: 'police/props/6.png', locked: true },
      { id: 7, name: 'Hat', image: 'police/props/7.png', locked: true },
      { id: 8, name: 'Hat', image: 'police/props/8.png', locked: true },
    ],
  },
  {
    name: 'Doctor',
    boy: { blackSkin: 'doctor-bb.jpg', whiteSkin: 'doctor-wb.jpg' },
    girl: { blackSkin: 'doctor-bg.jpg', whiteSkin: 'doctor-wg.jpg' },
    items: [
      { id: 1, name: 'Badge', image: 'doctor/props/1.png', locked: false },
      { id: 2, name: 'Hat', image: 'doctor/props/2.png', locked: true },
      { id: 3, name: 'Hat', image: 'doctor/props/3.png', locked: true },
      { id: 4, name: 'Hat', image: 'doctor/props/4.png', locked: true },
      { id: 5, name: 'Hat', image: 'doctor/props/5.png', locked: true },
      { id: 6, name: 'Hat', image: 'doctor/props/6.png', locked: true },
      { id: 7, name: 'Hat', image: 'doctor/props/7.png', locked: true },
      { id: 8, name: 'Hat', image: 'doctor/props/8.png', locked: true },
      { id: 9, name: 'Hat', image: 'doctor/props/9.png', locked: true },
      { id: 10, name: 'Hat', image: 'doctor/props/10.png', locked: true },
    ],
  },
  {
    name: 'Engineer',
    boy: { blackSkin: 'engineer-bb.jpg', whiteSkin: 'engineer-wb.jpg' },
    girl: { blackSkin: 'engineer-bg.jpg', whiteSkin: 'engineer-wg.jpg' },
    items: [
      { id: 1, name: 'Badge', image: 'engineer/props/1.png', locked: false },
      { id: 2, name: 'Hat', image: 'engineer/props/2.png', locked: true },
      { id: 3, name: 'Hat', image: 'engineer/props/3.png', locked: true },
      { id: 4, name: 'Hat', image: 'engineer/props/4.png', locked: true },
      { id: 5, name: 'Hat', image: 'engineer/props/5.png', locked: true },
      { id: 6, name: 'Hat', image: 'engineer/props/6.png', locked: true },
      { id: 7, name: 'Hat', image: 'engineer/props/7.png', locked: true },
      { id: 8, name: 'Hat', image: 'engineer/props/8.png', locked: true },
      { id: 9, name: 'Hat', image: 'engineer/props/9.png', locked: true },
      { id: 10, name: 'Hat', image: 'engineer/props/10.png', locked: true },
    ],
  },
  {
    name: 'Scientist',
    boy: { blackSkin: 'scientist-bb.jpg', whiteSkin: 'scientist-wb.jpg' },
    girl: { blackSkin: 'scientist-bg.jpg', whiteSkin: 'scientist-wg.jpg' },
    items: [
      { id: 1, name: 'Badge', image: 'scientist/props/1.png', locked: true },
      { id: 2, name: 'Hat', image: 'scientist/props/2.png', locked: true },
      { id: 3, name: 'Hat', image: 'scientist/props/3.png', locked: true },
      { id: 4, name: 'Hat', image: 'scientist/props/4.png', locked: true },
      { id: 5, name: 'Hat', image: 'scientist/props/5.png', locked: true },
      { id: 6, name: 'Hat', image: 'scientist/props/6.png', locked: true },
      { id: 7, name: 'Hat', image: 'scientist/props/7.png', locked: true },
      { id: 8, name: 'Hat', image: 'scientist/props/8.png', locked: true },
      { id: 9, name: 'Hat', image: 'scientist/props/9.png', locked: true },
      { id: 10, name: 'Hat', image: 'scientist/props/10.png', locked: true },
    ],
  },
  {
    name: 'Firefighter',
    boy: { blackSkin: 'firefighter-bb.jpg', whiteSkin: 'firefighter-wb.jpg' },
    girl: { blackSkin: 'firefighter-bg.jpg', whiteSkin: 'firefighter-wg.jpg' },
    items: [
      { id: 1, name: 'Badge', image: 'firefighter/props/1.png', locked: true },
      { id: 2, name: 'Hat', image: 'firefighter/props/2.png', locked: true },
      { id: 3, name: 'Hat', image: 'firefighter/props/3.png', locked: true },
      { id: 4, name: 'Hat', image: 'firefighter/props/4.png', locked: true },
      { id: 5, name: 'Hat', image: 'firefighter/props/5.png', locked: true },
      { id: 6, name: 'Hat', image: 'firefighter/props/6.png', locked: true },
      { id: 7, name: 'Hat', image: 'firefighter/props/7.png', locked: true },
      { id: 8, name: 'Hat', image: 'firefighter/props/8.png', locked: true },
      { id: 9, name: 'Hat', image: 'firefighter/props/9.png', locked: true },
      { id: 10, name: 'Hat', image: 'firefighter/props/10.png', locked: true },
    ],
  },
];

const skinTypes = [
  {
    type: 'bb',
    label: 'Black Boy',
    image: 'bb.jpg',
    gender: 'boy',
  },
  {
    type: 'wb',
    label: 'White Boy',
    image: 'wb.jpg',
    gender: 'boy',
  },
  {
    type: 'bg',
    label: 'Black Girl',
    image: 'bg.jpg',
    gender: 'girl',
  },
  {
    type: 'wg',
    label: 'White Girl',
    image: 'wg.jpg',
    gender: 'girl',
  },
];

const RenderLockSvg = ({ locked }: { locked: boolean }) =>
  locked ? (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='40'
      height='40'
      viewBox='0 0 24 24'
    >
      <path d='M17 9.761v-4.761c0-2.761-2.238-5-5-5-2.763 0-5 2.239-5 5v4.761c-1.827 1.466-3 3.714-3 6.239 0 4.418 3.582 8 8 8s8-3.582 8-8c0-2.525-1.173-4.773-3-6.239zm-8-4.761c0-1.654 1.346-3 3-3s3 1.346 3 3v3.587c-.927-.376-1.938-.587-3-.587s-2.073.211-3 .587v-3.587zm3 17c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm2-6c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2z' />
    </svg>
  ) : null;

export default function ShowRoom2() {
  // const skinColors = ['black', 'white'];
  // const [characters, setCharacters] = useState<IAvatar[]>();

  const [selectedCharacter, setSelectedCharacter] = useState<Character>(
    characters[0]
  );

  const [skinColor, setSkinColor] = useState<'black' | 'white'>('black');
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('bb'); // Default to 'bb'

  const location = useLocation();
  const routeValue = location.state || {};
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log('Route Value: ', routeValue);

    handleSkinTypeSelect(
      routeValue.type,
      routeValue.gender as 'boy' | 'girl',
      routeValue.label.toLowerCase().includes('black') ? 'black' : 'white'
    );
  }, [routeValue]);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);

    if (user) {
      dispatch(
        updateUserProfile({
          uid: user.uid,
          updatedData: {
            character: character.name,
            skin: skinColor,
            gender: gender,
          },
        })
      );
    }
  };

  const handleSkinTypeSelect = (
    skinType: string,
    gender: 'boy' | 'girl',
    skinColor: 'black' | 'white'
  ) => {
    setSelectedSkinType(skinType);
    setGender(gender);
    setSkinColor(skinColor);

    if (user) {
      dispatch(
        updateUserProfile({
          uid: user?.uid,
          updatedData: {
            skin: skinColor,
            gender: gender,
            character: selectedCharacter.name,
          },
        })
      );
    }
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
                  className={`${classes.characterAvatar} ${
                    selectedCharacter.name === character.name
                      ? classes.selected
                      : ''
                  }`}
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
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              className={classes.character}
              style={{
                display: 'flex',
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
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={classes.characterSkin}>
              {skinTypes.map((skin) => (
                <div
                  key={skin.type}
                  className={`${classes.characterAvatar} ${
                    selectedSkinType === skin.type ? classes.selected : ''
                  }`}
                  onClick={() =>
                    handleSkinTypeSelect(
                      skin.type,
                      skin.gender as 'boy' | 'girl',
                      skin.label.toLowerCase().includes('black')
                        ? 'black'
                        : 'white'
                    )
                  }
                >
                  <img
                    src={`${imagePath}/${skin.image}`}
                    alt={skin.label}
                    style={{ width: '80px' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={classes.middleSection}>
          <h1 className={classes.characterIventoryTitle}>Garage</h1>

          <div className={classes.garageWrapper}>
            <div className={classes.garageItem}></div>
            <div className={classes.garageItem}></div>
            <div className={classes.garageItem}></div>
            <div className={classes.garageItem}></div>
            <div className={classes.garageItem}></div>
          </div>
        </div>

        <div className={classes.leftSection}>
          <div className={classes.characterIventory}>
            <h1 className={classes.characterIventoryTitle}>
              {selectedCharacter.name}
            </h1>
            <div className={classes.characterIventoryProps}>
              {selectedCharacter.items.map((item) => (
                <div
                  key={item.id}
                  title={item.name}
                  className={classes.characterAvatar}
                  style={{
                    width: 80,
                    height: 80,
                    backgroundColor: '#f4f4f4',
                    position: 'relative',
                  }}
                >
                  <img
                    src={`${imagePath}/${item.image}`}
                    alt={item.name}
                    style={{ height: 50, objectFit: 'contain' }}
                  />
                  {item.locked && (
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',

                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <RenderLockSvg locked={item.locked} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
