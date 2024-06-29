import classes from './ShowRoom.module.css';

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
        <div className={classes.configView}></div>
      </div>
    </div>
  );
}
