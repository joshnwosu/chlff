import React, { useEffect, useState } from 'react';
import styles from './Scenery.module.css';

const sceneryItems = [
  { type: 'tree', src: '/tree.png' },
  { type: 'building', src: '/building.png' },
];

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Scenery: React.FC = () => {
  const [sceneryElements, setSceneryElements] = useState<
    { id: number; type: string; src: string; side: string; top: string }[]
  >([]);

  useEffect(() => {
    const elements = [];
    for (let i = 0; i < 10; i++) {
      const item = sceneryItems[getRandomInt(0, sceneryItems.length - 1)];
      const side = getRandomInt(0, 1) === 0 ? 'left' : 'right';
      const top = `${getRandomInt(0, 80)}%`;
      elements.push({ ...item, id: i, side, top });
    }
    setSceneryElements(elements);
  }, []);

  return (
    <div className={styles.scenery}>
      {sceneryElements.map((element) => (
        <div
          key={element.id}
          className={`${styles[element.type]} ${styles[element.side]}`}
          style={{ top: element.top, backgroundImage: `url(${element.src})` }}
        ></div>
      ))}
    </div>
  );
};

export default Scenery;
