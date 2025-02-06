import { FishTypeProps } from '../Fish';
import classes from './FishTypeDisplay.module.css';

interface Props {
  fishTypes: FishTypeProps[];
  currentFishType: number;
}

const FishTypeDisplay = ({ fishTypes, currentFishType }: Props) => {
  return (
    <div className={classes.fishTypeDisplay}>
      {fishTypes.map((fish, index) => (
        <div
          key={fish.type}
          className={`${classes.fishType} ${
            index <= currentFishType ? classes.activeFishType : ''
          }`}
        >
          <img src={fish.image} alt={fish.type} className={classes.fishImage} />
          {/* <span>{fish.type}</span> */}
        </div>
      ))}
    </div>
  );
};

export default FishTypeDisplay;
