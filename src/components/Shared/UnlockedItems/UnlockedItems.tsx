import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import classes from './UnlockedItems.module.css';
import {
  fetchUnlockedItems,
  ItemsPayload,
} from '../../../features/characters/charactersSlice';
import ScrollableTabBar from '../../ScrollableTabBar/ScrollableTabBar';

const imagePath = '/assets/showroom/avatar';

interface UnlockedItemProps {
  characterName: string;
  items: ItemsPayload;
}

export default function UnlockedItems({
  characterName,
  items,
}: UnlockedItemProps) {
  const dispatch = useAppDispatch();
  const { unlockedItems } = useAppSelector((state) => state.characters);
  const [selected, setSelected] = useState<String>(characterName);

  useEffect(() => {
    handleFetchUnlockedItems(characterName);
  }, [characterName, dispatch]);

  const handleFetchUnlockedItems = (characterName: string) => {
    setSelected(characterName);
    dispatch(
      fetchUnlockedItems({
        characterName: characterName,
        items,
      })
    );
  };

  const tabs = [
    {
      label: 'Police',
      // content: <div>Unlocked Items Content</div>,
    },
    {
      label: 'Engineer',
      // content: <div>Unlocked Items Content</div>,
    },
    {
      label: 'Firefighter',
      // content: <div>Locked Items Content</div>,
    },
    {
      label: 'Doctor',
      // content: <div>Unlocked Items Content</div>,
    },
    {
      label: 'Scientist',
      // content: <div>Locked Items Content</div>,
    },
  ];

  return (
    <div className={classes.unlockedItemsContainer}>
      <ScrollableTabBar
        tabs={tabs}
        defaultActiveTab={characterName}
        onTabChange={(_, label) => handleFetchUnlockedItems(label)}
      />

      {unlockedItems.length ? (
        <div className={classes.unlockedItems}>
          {unlockedItems.map((item, index) => (
            <div key={index.toString()} className={classes.unlockedItem}>
              <img
                key={index.toString()}
                src={`${imagePath}/${item.image}`}
                alt={item.name}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={classes.noItem}>
          <p className={classes.noItemText}>
            No Items Unlocked for <br />
            {selected}
          </p>
        </div>
      )}
    </div>
  );
}
