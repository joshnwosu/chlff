import ScrollableTabBar from '../../ScrollableTabBar/ScrollableTabBar';
import CustomModalWrapper from '../../Shared/CustomModalWrapper/CustomModalWrapper';
import Overlay from '../../Shared/Overlay/Overlay';
import classes from './UnlockedItemModal.module.css';

const imagePath = '/assets/showroom/avatar';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: any[]; // Replace with actual type
}

const tabs = [
  {
    label: 'Police',
    content: <div>Unlocked Items Content</div>,
  },
  {
    label: 'Fire fighter',
    content: <div>Locked Items Content</div>,
  },
  {
    label: 'Doctor',
    content: <div>Unlocked Items Content</div>,
  },
  {
    label: 'Scientist',
    content: <div>Locked Items Content</div>,
  },
];

export default function UnlockedItemModal({ isOpen, onClose, items }: Props) {
  return (
    <Overlay opened={isOpen} close={onClose}>
      <CustomModalWrapper title='Unlocked Items'>
        <div className={classes.unlockedItemsContainer}>
          {items.map((item, index) => (
            <div key={index.toString()} className={classes.unlockedItem}>
              <img
                key={index.toString()}
                src={`${imagePath}/${item.image}`}
                alt={item.name}
              />
            </div>
          ))}
        </div>

        <ScrollableTabBar tabs={tabs} defaultActiveTab={0} />
      </CustomModalWrapper>
    </Overlay>
  );
}
