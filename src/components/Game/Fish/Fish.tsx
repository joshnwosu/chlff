import FishRenderer from '../../../test/FishRenderer';
import RandFishRenderer from '../../../test/RandFishRenderer';
import classes from './Fish.module.css';

export default function Fish() {
  return (
    <div className={classes.main}>
      {Array.from({ length: 50 }).map((_, index) => (
        <span key={index} className={classes.bubble}></span>
      ))}

      {/* <div className={classes.fishWrapper}>
        
      </div> */}

      <FishRenderer />
      <RandFishRenderer />
    </div>
  );
}
