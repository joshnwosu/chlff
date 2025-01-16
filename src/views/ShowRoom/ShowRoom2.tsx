import { useEffect, useState } from 'react';
import classes from './Showroom2.module.css';
import { getAvatarsByGender, IAvatar } from '../../data/showroom/images';

export default function ShowRoom2() {
  const skinColors = ['black', 'white'];
  const [characters, setCharacters] = useState<IAvatar[]>();

  useEffect(() => {
    setCharacters(getAvatarsByGender('male'));
  }, []);

  // Create a dummy array of 10 objects
  const dummyArray = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    value: Math.floor(Math.random() * 100), // Random value for variety
  }));

  return (
    <div className={classes.container}>
      <div className={classes.flexContainer}>
        <div className={classes.rightSection}>
          <div className={classes.rightSectionInner}>
            <div className={classes.characterThumbnail}>
              {characters?.map((c, index) => (
                <div
                  key={index.toString()}
                  className={classes.characterAvatar}
                ></div>
              ))}
            </div>
            <div className={classes.character}></div>
            <div className={classes.characterSkin}>
              {skinColors?.map((c, index) => (
                <div
                  key={index.toString()}
                  className={classes.characterAvatar}
                ></div>
              ))}
            </div>
          </div>

          <div className={classes.characterVehicle}></div>
        </div>
        <div className={classes.leftSection}>
          <div className={classes.characterIventory}>
            <h1 className={classes.characterIventoryTitle}>FireFighter</h1>
            <div className={classes.characterIventoryProps}></div>
          </div>

          <div className={classes.characterIventory}>
            <h1 className={classes.characterIventoryTitle}>Doctor</h1>
            <div className={classes.characterIventoryProps}></div>
          </div>

          <div className={classes.characterIventory}>
            <h1 className={classes.characterIventoryTitle}>Police</h1>
            <div className={classes.characterIventoryProps}></div>
          </div>

          <div className={classes.characterIventory}>
            <h1 className={classes.characterIventoryTitle}>Engineer</h1>
            <div className={classes.characterIventoryProps}></div>
          </div>

          <div className={classes.characterIventory}>
            <h1 className={classes.characterIventoryTitle}>Scientist</h1>
            <div className={classes.characterIventoryProps}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
