import classes from './ShowRoom.module.css';
import { getAvatarsByGender, IAvatar } from '../../data/showroom/images';
import { useEffect, useState } from 'react';

export default function ShowRoom() {
  const colors = [
    '#FB7F7D',
    '#FBC666',
    '#F6ACF8',
    '#62D0DA',
    '#4AA67B',
    '#2D3331',
  ];

  const [characters, setCharacters] = useState<IAvatar[]>();
  const [selectedCharacter, setSelectedCharacter] = useState<IAvatar>();

  useEffect(() => {
    setCharacters(getAvatarsByGender('male'));
  }, []);

  useEffect(() => {
    if (characters) {
      setSelectedCharacter(characters[0]);
    }
  }, [characters]);

  const handleChangeCharacter = (item: IAvatar) => {
    setSelectedCharacter(item);
  };

  return (
    <div className={classes.container}>
      <div className={classes.showroomView}>
        <div className={classes.characterView}>
          <div className={classes.characterSkin}>
            <p className={classes.title}>Skin</p>
            <div className={classes.flex}>
              {characters?.map((c, index) => (
                <div
                  key={index.toString()}
                  className={classes.character}
                  style={{ backgroundColor: 'beige' }}
                  onClick={() => handleChangeCharacter(c)}
                >
                  <img src={c.image} />
                </div>
              ))}
            </div>
          </div>
          <div className={classes.characterContainer}>
            <h1>{selectedCharacter?.name}</h1>
            <img src={selectedCharacter?.image} />
          </div>
          <div className={classes.characterColor}>
            <p className={classes.title}>Color</p>
            <div className={classes.flex}>
              {colors.map((color, index) => (
                <div
                  key={index.toString()}
                  className={classes.color}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className={classes.configView}>
          <div className={classes.props}>
            {selectedCharacter?.props.map((item, i) => (
              <div key={i} className={classes.prop}>
                <img src={item.image} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
