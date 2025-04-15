import { useEffect } from 'react';
import classes from './Showroom.module.css';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { updateUserProfile } from '../../features/auth/authSlice';
import {
  getUserProfile,
  updateUserProfile,
} from '../../features/user/userSlice';
import {
  setSelectedCharacter,
  setSkinColor,
  setGender,
  setSelectedSkinType,
  // Character,
} from '../../features/characters/charactersSlice';
import { Character } from '../../data/showroom/characters';

const imagePath = '/assets/showroom/avatar';

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
  const location = useLocation();
  const routeValue = location.state || {};
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { characters, selectedCharacter, skinColor, gender, selectedSkinType } =
    useAppSelector((state) => state.characters);

  useEffect(() => {
    if (routeValue && routeValue?.type) {
      dispatch(setSelectedSkinType(routeValue.type));
      dispatch(setGender(routeValue.gender));
      dispatch(
        setSkinColor(
          routeValue.label?.toLowerCase().includes('black') ? 'black' : 'white'
        )
      );

      // Find the character by name from the routeValue
      const characterName = routeValue.characterName; // Assuming routeValue contains characterName
      if (characterName) {
        const character = characters.find(
          (char) => char.name === characterName
        );
        if (character) {
          dispatch(setSelectedCharacter(character));
        }
      }
    }
  }, [dispatch, routeValue, characters]);

  const handleCharacterSelect = async (character: Character) => {
    dispatch(setSelectedCharacter(character));

    if (user) {
      await dispatch(
        updateUserProfile({
          uid: user.uid,
          updatedData: {
            character: character.name,
            skin: skinColor,
            gender: gender,
          },
        })
      );

      await dispatch(getUserProfile());
    }
  };

  const handleSkinTypeSelect = async (
    skinType: string,
    gender: 'boy' | 'girl',
    skinColor: 'black' | 'white'
  ) => {
    dispatch(setSelectedSkinType(skinType));
    dispatch(setGender(gender));
    dispatch(setSkinColor(skinColor));

    if (user) {
      await dispatch(
        updateUserProfile({
          uid: user?.uid,
          updatedData: {
            skin: skinColor,
            gender: gender,
            character: selectedCharacter?.name || '',
          },
        })
      );

      dispatch(getUserProfile());
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
                    selectedCharacter?.name === character.name
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
            {selectedCharacter ? (
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
            ) : (
              <div
                className={classes.character}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  padding: 20,
                  backgroundColor: '#a6d9f4',
                }}
              >
                <h1 className={classes.NoCharater}>
                  You haven't selected an avatar yet!
                </h1>
              </div>
            )}
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
            {characters.map((character, index) => (
              <>
                <img
                  key={index.toString()}
                  src={`/assets/car/${character.vehicle}`}
                  alt={`${character.name}-vehicle`}
                  style={{
                    objectFit: 'contain',
                  }}
                  className={`${classes.garageItem} ${
                    selectedCharacter?.name === character.name
                      ? classes.selected
                      : ''
                  }`}
                />
              </>
            ))}
          </div>
        </div>

        <div className={classes.leftSection}>
          <div className={classes.characterIventory}>
            <h1 className={classes.characterIventoryTitle}>
              {selectedCharacter?.name}
            </h1>
            <div className={classes.characterIventoryProps}>
              {selectedCharacter?.items.map((item) => (
                <div
                  key={item.id}
                  title={item.name}
                  className={classes.characterAvatar}
                  style={{
                    width: '100%',
                    backgroundColor: '#f4f4f4',
                    position: 'relative',
                  }}
                >
                  <img
                    src={`${imagePath}/${item.image}`}
                    alt={item.name}
                    style={{ height: 50, objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
