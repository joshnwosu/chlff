import classes from './Bubbles.module.css';

export default function Bubbles() {
  return (
    <div className={classes.main}>
      {Array.from({ length: 50 }).map((_, index) => (
        <span key={index} className={classes.bubble}></span>
      ))}
    </div>
  );
}
