import Overlay from '../../../Shared/Overlay/Overlay';
import GamePopupModal from '../../../Modals/GamePopupModal/GamePopupModal';
import classes from './FishSelectSpeedModal.module.css';

interface ListProps {
  name: string;
}

interface Props {
  show: boolean;
  handleClose: () => void;
  onClick: (val: ListProps) => void;
}

const lists: ListProps[] = [
  { name: 'Easy' },
  { name: 'Medium' },
  { name: 'Hard' },
  { name: 'Extreme' },
];

export default function FishSelectSpeedModal({
  show,
  handleClose,
  onClick,
}: Props) {
  const handleSpeedSelection = (item: ListProps) => {
    // console.log('Item: ', item);
    onClick(item);
  };
  return (
    <Overlay opened={show} close={handleClose}>
      <GamePopupModal title='Select Difficulty'>
        <div className={classes.cardsContainer}>
          {lists.map((list) => (
            <div
              key={list.name}
              onClick={() => handleSpeedSelection(list)}
              className={classes.cardWrapper}
            >
              <div className={classes.card}></div>
              <p className={classes.cardTitle}>{list.name}</p>
            </div>
          ))}
        </div>
      </GamePopupModal>
    </Overlay>
  );
}
