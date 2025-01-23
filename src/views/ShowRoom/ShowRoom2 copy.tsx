import { useEffect, useState } from 'react';
import classes from './Showroom2.module.css';
import { getAvatarsByGender, IAvatar } from '../../data/showroom/images';
import { useLocation } from 'react-router-dom';

export default function ShowRoom2() {
  const skinColors = ['black', 'white'];
  const [characters, setCharacters] = useState<IAvatar[]>();

  const location = useLocation();
  const routeValue = location.state || {};

  useEffect(() => {
    setCharacters(getAvatarsByGender('male'));

    console.log('Value: ', routeValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Create a dummy array of 10 objects
  const dummyArray = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    value: Math.floor(Math.random() * 100), // Random value for variety
  }));

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

  return (
    <div className={classes.container}>
      <div className={classes.flexContainer}>
        <div className={classes.rightSection}>
          <div className={classes.rightSectionInner}>
            <div className={classes.characterThumbnail}>
              {characters?.map((_, index) => (
                <div
                  key={index.toString()}
                  className={classes.characterAvatar}
                ></div>
              ))}
            </div>
            <div className={classes.character}></div>
            <div className={classes.characterSkin}>
              {skinColors?.map((_, index) => (
                <div
                  key={index.toString()}
                  className={classes.characterAvatar}
                ></div>
              ))}
            </div>
          </div>

          <div className={classes.characterVehicle}>
            <div className={classes.characterAvatar}></div>
            <div className={classes.characterAvatar}></div>
            <div className={classes.characterAvatar}></div>
            <div className={classes.characterAvatar}></div>
            <div className={classes.characterAvatar}></div>
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
