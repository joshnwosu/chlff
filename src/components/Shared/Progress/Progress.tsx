import classes from './Progress.module.css';

export default function Progress() {
  return (
    <div className={classes.progress}>
      <div className={classes.title}>
        <p>Progress</p>
        <p>Level 1</p>
      </div>
      <div className={classes.seek}>
        <div className={classes['seek-bar']}></div>
      </div>
    </div>
  );
}
