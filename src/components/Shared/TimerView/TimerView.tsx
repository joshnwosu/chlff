import classes from './TimerView.module.css';

interface GasViewProps {
  title: string;
  timer?: number;
  timerDescription: string;
}

export default function TimerView({
  timer,
  title,
  timerDescription,
}: GasViewProps) {
  return (
    <div className={classes.gasView}>
      <div className={classes.gasCount}>
        <p>{title}</p>
      </div>

      <div className={classes.unitCount}>
        <p>{timer}</p>
        <p>{timerDescription}</p>
      </div>
    </div>
  );
}
