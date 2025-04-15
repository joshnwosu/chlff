import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { unlockItemService } from '../../services/userService';
import { Character, characters } from '../../data/showroom/characters';
interface CharactersState {
  characters: Character[];
  selectedCharacter: Character | null;
  skinColor: 'black' | 'white';
  gender: 'boy' | 'girl';
  selectedSkinType: string;
  unlockedItemsStatus: 'idle' | 'loading' | 'succeeded' | 'failed'; // Track async status
  unlockedItemsError: string | null; // Store error if any
  unlockedItems: Character['items']; // Store unlocked items for modal
}

const initialState: CharactersState = {
  characters: characters,
  selectedCharacter: null,
  skinColor: 'black',
  gender: 'boy',
  selectedSkinType: 'bb',
  unlockedItemsStatus: 'idle', // Initialize async status
  unlockedItemsError: null, // Initialize error state
  unlockedItems: [],
};

// Async thunk for unlocking an item
export const unlockItem = createAsyncThunk<
  void,
  {
    uid: string;
    characterName: string;
    gender: 'boy' | 'girl';
    itemId: number;
  },
  { rejectValue: string }
>(
  'characters/unlockItem',
  async ({ uid, characterName, gender, itemId }, { rejectWithValue }) => {
    try {
      if (!uid) {
        throw new Error('User ID is undefined');
      }
      await unlockItemService(uid, characterName, gender, itemId);
    } catch (error: any) {
      console.error('Error unlocking item:', error);
      return rejectWithValue(error.message || 'Failed to unlock item');
    }
  }
);

export interface ItemsPayload {
  [characterGenderKey: string]: {
    unlockedItemIds: number[];
  };
}

// Async thunk for fetching unlocked items
export const fetchUnlockedItems = createAsyncThunk<
  Character['items'], // Return type: array of items
  { characterName: string; gender: 'boy' | 'girl'; items: ItemsPayload }, // Payload includes items
  {
    rejectValue: string;
    state: { characters: CharactersState }; // Only need characters state
  }
>(
  'characters/fetchUnlockedItems',
  async ({ characterName, gender, items }, { getState, rejectWithValue }) => {
    try {
      // Get character from state to access items
      const state = getState();
      const character = state.characters.characters.find(
        (char) => char.name.toLowerCase() === characterName.toLowerCase()
      );
      if (!character) {
        throw new Error(`Character ${characterName} not found`);
      }

      // Get unlockedItemIds from provided items
      const characterGenderKey = `${characterName}_${gender}`;
      const unlockedItemIds = items[characterGenderKey]?.unlockedItemIds || [];

      // Filter character's items by unlockedItemIds
      const unlockedItems = character.items.filter((item) =>
        unlockedItemIds.includes(item.id)
      );
      console.log(
        `Fetched unlocked items for ${characterGenderKey}:`,
        unlockedItems
      );
      return unlockedItems;
    } catch (error: any) {
      console.error('Error fetching unlocked items:', error);
      return rejectWithValue(error.message || 'Failed to fetch unlocked items');
    }
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setSelectedCharacter: (state, action: PayloadAction<Character>) => {
      state.selectedCharacter = action.payload;
    },
    setSkinColor: (state, action: PayloadAction<'black' | 'white'>) => {
      state.skinColor = action.payload;
    },
    setGender: (state, action: PayloadAction<'boy' | 'girl'>) => {
      state.gender = action.payload;
    },
    setSelectedSkinType: (state, action: PayloadAction<string>) => {
      state.selectedSkinType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(unlockItem.pending, (state) => {
        state.unlockedItemsStatus = 'loading';
        state.unlockedItemsError = null;
      })
      .addCase(unlockItem.fulfilled, (state, action) => {
        state.unlockedItemsStatus = 'succeeded';
        const { characterName, gender, itemId } = action.meta.arg;
        const characterGenderKey = `${characterName}_${gender}`;
        console.log(
          `Item ${itemId} unlocked successfully for ${characterGenderKey}`
        );
      })
      .addCase(unlockItem.rejected, (state, action) => {
        state.unlockedItemsStatus = 'failed';
        state.unlockedItemsError = action.payload || 'Unknown error';
        console.error('Error unlocking item:', action.payload);
      })
      // Fetch unlocked items handlers
      .addCase(fetchUnlockedItems.pending, (state) => {
        state.unlockedItemsStatus = 'loading';
        state.unlockedItemsError = null;
      })
      .addCase(fetchUnlockedItems.fulfilled, (state, action) => {
        state.unlockedItemsStatus = 'succeeded';
        state.unlockedItems = action.payload;
        const { characterName, gender } = action.meta.arg;
        console.log(
          `Fetched unlocked items for ${characterName}_${gender}:`,
          action.payload
        );
      })
      .addCase(fetchUnlockedItems.rejected, (state, action) => {
        state.unlockedItemsStatus = 'failed';
        state.unlockedItemsError = action.payload || 'Unknown error';
        state.unlockedItems = [];
        console.error('Error fetching unlocked items:', action.payload);
      });
  },
});

// Selector to get items by character name
export const selectItemsByCharacterName = (
  state: { characters: CharactersState },
  characterName: string
) => {
  const character = state.characters.characters.find(
    (char) => char.name === characterName
  );
  return character ? character.items : null;
};

export const {
  setSelectedCharacter,
  setSkinColor,
  setGender,
  setSelectedSkinType,
} = charactersSlice.actions;

export default charactersSlice.reducer;
