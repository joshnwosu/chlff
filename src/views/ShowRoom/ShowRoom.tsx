import classes from './ShowRoom.module.css';

// const avatars = [
//   { name: 'Firefighter', image: 'firefighter-male.png', gender: 'male' },
//   { name: 'Police Officer', image: 'police-male.png', gender: 'male' },
//   { name: 'Doctor', image: 'doctor-male.png', gender: 'male' },
//   { name: 'Firefighter', image: 'firefighter-female.png', gender: 'female' },
//   { name: 'Police Officer', image: 'police-female.png', gender: 'female' },
//   { name: 'Doctor', image: 'doctor-female.png', gender: 'female' },
// ];

export default function ShowRoom() {
  const colors = [
    '#FB7F7D',
    '#FBC666',
    '#F6ACF8',
    '#62D0DA',
    '#4AA67B',
    '#2D3331',
  ];
  return (
    <div className={classes.container}>
      <div className={classes.showroomView}>
        <div className={classes.characterView}>
          <div className={classes.characterSkin}>
            <p className={classes.title}>Skin</p>
            <div className={classes.flex}></div>
          </div>
          <div className={classes.characterContainer}></div>
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
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={classes.prop}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
