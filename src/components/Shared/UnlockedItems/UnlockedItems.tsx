import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import classes from './UnlockedItems.module.css';
import {
  fetchUnlockedItems,
  ItemsPayload,
} from '../../../features/characters/charactersSlice';

const imagePath = '/assets/showroom/avatar';

interface UnlockedItemProps {
  characterName: string;
  gender: 'boy' | 'girl';
  items: ItemsPayload;
}

export default function UnlockedItems({
  characterName,
  gender,
  items,
}: UnlockedItemProps) {
  const dispatch = useAppDispatch();
  const { unlockedItems } = useAppSelector((state) => state.characters);

  useEffect(() => {
    dispatch(
      fetchUnlockedItems({
        characterName: characterName,
        gender: gender,
        items,
      })
    );
  }, [dispatch]);

  return (
    <div className={classes.unlockedItemsContainer}>
      {unlockedItems.length ? (
        <>
          {unlockedItems.map((item, index) => (
            <div key={index.toString()} className={classes.unlockedItem}>
              <img
                key={index.toString()}
                src={`${imagePath}/${item.image}`}
                alt={item.name}
                style={{ objectFit: 'cover', width: 30, height: 30 }}
              />
            </div>
          ))}
        </>
      ) : (
        <div className={classes.noItem}>
          <p className={classes.noItemText}>None</p>
        </div>
      )}
    </div>
  );
}
