import classes from './GasView.module.css';

interface GasViewProps {
  score?: number;
}

export default function GasView({ score }: GasViewProps) {
  return (
    <div className={classes.gasView}>
      <div className={classes.gasCount}>
        <p>GAS</p>
      </div>

      <div className={classes.unitCount}>
        <p>{score}</p>
        <p>Unit left</p>
      </div>
    </div>
  );
}
