import classes from './GasView.module.css';

export default function GasView() {
  return (
    <div className={classes.gasView}>
      <div className={classes.gasCount}>
        <p>GAS</p>
      </div>

      <div className={classes.unitCount}>
        <p>211</p>
        <p>Unit left</p>
      </div>
    </div>
  );
}
