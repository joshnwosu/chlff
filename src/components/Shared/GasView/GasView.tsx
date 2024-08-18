import classes from './GasView.module.css';

interface GasViewProps {
  unit?: number;
}

export default function GasView({ unit }: GasViewProps) {
  return (
    <div className={classes.gasView}>
      <div className={classes.gasCount}>
        <p>GAS</p>
      </div>

      <div className={classes.unitCount}>
        <p>{unit}</p>
        <p>Unit left</p>
      </div>
    </div>
  );
}
