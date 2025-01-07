import Overlay from '../../../Shared/Overlay/Overlay';
// import GamePopupModal from '../../../Modals/GamePopupModal/GamePopupModal';
import classes from './FishSelectSpeedModal.module.css';
import ElementWrapper from '../../../Shared/ElementWrapper/ElementWrapper';

interface ListProps {
  name: string;
  color: string;
}

interface Props {
  show: boolean;
  handleClose: () => void;
  onClick: (val: ListProps) => void;
}

const lists: ListProps[] = [
  { name: 'Easy', color: '#43FE09' },
  { name: 'Medium', color: '#FEDB08' },
  { name: 'Hard', color: '#FF9501' },
  { name: 'Extreme', color: '#FE1515' },
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
      {/* <GamePopupModal title='Select Difficulty'> */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ElementWrapper title='Select Difficulty' height={400}>
          <div className={classes.cardsContainer}>
            {lists.map((list) => (
              <div
                key={list.name}
                onClick={() => handleSpeedSelection(list)}
                className={classes.cardWrapper}
              >
                <p
                  className={classes.cardTitle}
                  style={{
                    color: list.color,
                  }}
                >
                  {list.name}
                </p>
              </div>
            ))}
          </div>
        </ElementWrapper>
      </div>
      {/* </GamePopupModal> */}
    </Overlay>
  );
}
