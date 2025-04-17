import { useEffect, useMemo } from 'react';
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
import { getLeaderBoard } from '../../features/leaderBoard/leaderBoardSlice';
import { getUnlockedItems } from '../../utils/unlockedItems';

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

const RenderLockSvg = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
  >
    <path d='M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-5 7.723v2.277h-2v-2.277c-.595-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723zm-5-7.723v-4c0-2.206 1.794-4 4-4 2.205 0 4 1.794 4 4v4h-8z' />
  </svg>
);

export default function ShowRoom2() {
  const location = useLocation();
  const routeValue = location.state || {};
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { characters, selectedCharacter, skinColor, gender, selectedSkinType } =
    useAppSelector((state) => state.characters);

  const { selectedYear } = useAppSelector((state) => state.control);

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

      // await dispatch(getUserProfile());
      handleUpdates();
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

      handleUpdates();
    }
  };

  const handleUpdates = async () => {
    await dispatch(getUserProfile());
    await dispatch(getLeaderBoard(selectedYear));
  };

  useEffect(() => {
    if (user) {
      getUnlockedItems({
        characterName: user?.character,
        items: selectedCharacter?.items!,
        itemsPayload: user?.items,
        mode: 'grayOut',
      });
    }
  }, []);

  const unlockedItems = useMemo(() => {
    if (!selectedCharacter || !user || !user.items || !gender) {
      return [];
    }
    return getUnlockedItems({
      items: selectedCharacter.items,
      itemsPayload: user.items,
      characterName: selectedCharacter.name,
      mode: 'grayOut',
    });
  }, [selectedCharacter, user, gender]);

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
              <div key={index.toString()}>
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
              </div>
            ))}
          </div>
        </div>

        <div className={classes.leftSection}>
          <div className={classes.characterIventory}>
            <h1 className={classes.characterIventoryTitle}>
              {selectedCharacter?.name}
            </h1>
            <div className={classes.characterIventoryProps}>
              {unlockedItems.map((item) => (
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
                    style={{
                      height: 50,
                      objectFit: 'contain',
                      opacity: !item.isGrayedOut ? 0.5 : 1,
                    }}
                  />

                  {!item.isGrayedOut && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      <RenderLockSvg />
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
