import classes from './Progress.module.css';

interface ProgressProps {
  stage?: number;
}

export default function Progress({ stage }: ProgressProps) {
  return (
    <div className={classes.progress}>
      <div className={classes.title}>
        <p>Progress</p>
        <p>Mission {stage}</p>
      </div>
      <div className={classes.seek}>
        <div className={classes['seek-bar']}></div>
      </div>
    </div>
  );
}
