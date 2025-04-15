interface Item {
  id: number;
  name: string;
  image: string;
}

interface ModalItem extends Item {
  isGrayedOut?: boolean; // Added for grayOut mode
}

export interface ItemsPayload {
  [characterGenderKey: string]: {
    unlockedItemIds: number[];
  };
}

interface GetModalItemsOptions {
  items: Item[];
  itemsPayload: ItemsPayload;
  characterName: string;
  gender: 'boy' | 'girl';
  mode: 'remove' | 'grayOut';
}

export const getUnlockedItems = ({
  items,
  itemsPayload,
  characterName,
  gender,
  mode,
}: GetModalItemsOptions): ModalItem[] => {
  // Validate inputs
  if (!items || items.length === 0) {
    console.warn('No items provided');
    return [];
  }

  // Construct characterGenderKey
  const characterGenderKey = `${characterName}_${gender}`;

  // Get unlocked item IDs
  const unlockedItemIds =
    itemsPayload[characterGenderKey]?.unlockedItemIds || [];

  // Process items based on mode
  if (mode === 'remove') {
    return items.filter((item) => !unlockedItemIds.includes(item.id));
  }

  return items.map((item) => ({
    ...item,
    isGrayedOut: unlockedItemIds.includes(item.id),
  }));
};
