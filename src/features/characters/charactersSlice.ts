// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Item {
//   id: number;
//   name: string;
//   image: string;
//   locked: boolean;
// }

// export interface Character {
//   name: string;
//   boy: {
//     blackSkin: string;
//     whiteSkin: string;
//   };
//   girl: {
//     blackSkin: string;
//     whiteSkin: string;
//   };
//   items: Item[];
//   vehicle: string;
// }

// interface CharactersState {
//   characters: Character[];
//   selectedCharacter: Character | null;
//   skinColor: 'black' | 'white';
//   gender: 'boy' | 'girl';
//   selectedSkinType: string;
// }

// const initialState: CharactersState = {
//   characters: [
//     {
//       name: 'Police',
//       boy: { blackSkin: 'police-bb.jpg', whiteSkin: 'police-wb.jpg' },
//       girl: { blackSkin: 'police-bg.jpg', whiteSkin: 'police-wg.jpg' },
//       items: [
//         { id: 1, name: 'Badge', image: 'police/props/1.png', locked: true },
//         { id: 2, name: 'Hat', image: 'police/props/2.png', locked: true },
//         { id: 3, name: 'Hat', image: 'police/props/3.png', locked: true },
//         { id: 4, name: 'Hat', image: 'police/props/4.png', locked: true },
//         { id: 5, name: 'Hat', image: 'police/props/5.png', locked: true },
//         { id: 6, name: 'Hat', image: 'police/props/6.png', locked: true },
//         { id: 7, name: 'Hat', image: 'police/props/7.png', locked: true },
//         { id: 8, name: 'Hat', image: 'police/props/8.png', locked: true },
//       ],
//       vehicle: 'police-car.jpg',
//     },
//     {
//       name: 'Doctor',
//       boy: { blackSkin: 'doctor-bb.jpg', whiteSkin: 'doctor-wb.jpg' },
//       girl: { blackSkin: 'doctor-bg.jpg', whiteSkin: 'doctor-wg.jpg' },
//       items: [
//         { id: 1, name: 'Badge', image: 'doctor/props/1.png', locked: true },
//         { id: 2, name: 'Hat', image: 'doctor/props/2.png', locked: true },
//         { id: 3, name: 'Hat', image: 'doctor/props/3.png', locked: true },
//         { id: 4, name: 'Hat', image: 'doctor/props/4.png', locked: true },
//         { id: 5, name: 'Hat', image: 'doctor/props/5.png', locked: true },
//         { id: 6, name: 'Hat', image: 'doctor/props/6.png', locked: true },
//         { id: 7, name: 'Hat', image: 'doctor/props/7.png', locked: true },
//         { id: 8, name: 'Hat', image: 'doctor/props/8.png', locked: true },
//         { id: 9, name: 'Hat', image: 'doctor/props/9.png', locked: true },
//         { id: 10, name: 'Hat', image: 'doctor/props/10.png', locked: true },
//       ],
//       vehicle: 'ambulance.jpg',
//     },
//     {
//       name: 'Engineer',
//       boy: { blackSkin: 'engineer-bb.jpg', whiteSkin: 'engineer-wb.jpg' },
//       girl: { blackSkin: 'engineer-bg.jpg', whiteSkin: 'engineer-wg.jpg' },
//       items: [
//         { id: 1, name: 'Badge', image: 'engineer/props/1.png', locked: true },
//         { id: 2, name: 'Hat', image: 'engineer/props/2.png', locked: true },
//         { id: 3, name: 'Hat', image: 'engineer/props/3.png', locked: true },
//         { id: 4, name: 'Hat', image: 'engineer/props/4.png', locked: true },
//         { id: 5, name: 'Hat', image: 'engineer/props/5.png', locked: true },
//         { id: 6, name: 'Hat', image: 'engineer/props/6.png', locked: true },
//         { id: 7, name: 'Hat', image: 'engineer/props/7.png', locked: true },
//         { id: 8, name: 'Hat', image: 'engineer/props/8.png', locked: true },
//         { id: 9, name: 'Hat', image: 'engineer/props/9.png', locked: true },
//         { id: 10, name: 'Hat', image: 'engineer/props/10.png', locked: true },
//       ],
//       vehicle: 'engineering-truck.jpg',
//     },
//     {
//       name: 'Scientist',
//       boy: { blackSkin: 'scientist-bb.jpg', whiteSkin: 'scientist-wb.jpg' },
//       girl: { blackSkin: 'scientist-bg.jpg', whiteSkin: 'scientist-wg.jpg' },
//       items: [
//         { id: 1, name: 'Badge', image: 'scientist/props/1.png', locked: true },
//         { id: 2, name: 'Hat', image: 'scientist/props/2.png', locked: true },
//         { id: 3, name: 'Hat', image: 'scientist/props/3.png', locked: true },
//         { id: 4, name: 'Hat', image: 'scientist/props/4.png', locked: true },
//         { id: 5, name: 'Hat', image: 'scientist/props/5.png', locked: true },
//         { id: 6, name: 'Hat', image: 'scientist/props/6.png', locked: true },
//         { id: 7, name: 'Hat', image: 'scientist/props/7.png', locked: true },
//         { id: 8, name: 'Hat', image: 'scientist/props/8.png', locked: true },
//         { id: 9, name: 'Hat', image: 'scientist/props/9.png', locked: true },
//         { id: 10, name: 'Hat', image: 'scientist/props/10.png', locked: true },
//       ],
//       vehicle: 'research-van.jpg',
//     },
//     {
//       name: 'Firefighter',
//       boy: { blackSkin: 'firefighter-bb.jpg', whiteSkin: 'firefighter-wb.jpg' },
//       girl: {
//         blackSkin: 'firefighter-bg.jpg',
//         whiteSkin: 'firefighter-wg.jpg',
//       },
//       items: [
//         {
//           id: 1,
//           name: 'Badge',
//           image: 'firefighter/props/1.png',
//           locked: true,
//         },
//         { id: 2, name: 'Hat', image: 'firefighter/props/2.png', locked: true },
//         { id: 3, name: 'Hat', image: 'firefighter/props/3.png', locked: true },
//         { id: 4, name: 'Hat', image: 'firefighter/props/4.png', locked: true },
//         { id: 5, name: 'Hat', image: 'firefighter/props/5.png', locked: true },
//         { id: 6, name: 'Hat', image: 'firefighter/props/6.png', locked: true },
//         { id: 7, name: 'Hat', image: 'firefighter/props/7.png', locked: true },
//         { id: 8, name: 'Hat', image: 'firefighter/props/8.png', locked: true },
//         { id: 9, name: 'Hat', image: 'firefighter/props/9.png', locked: true },
//         {
//           id: 10,
//           name: 'Hat',
//           image: 'firefighter/props/10.png',
//           locked: true,
//         },
//       ],
//       vehicle: 'fire-truck.jpg',
//     },
//   ],
//   selectedCharacter: null,
//   skinColor: 'black',
//   gender: 'boy',
//   selectedSkinType: 'bb',
// };

// const charactersSlice = createSlice({
//   name: 'characters',
//   initialState,
//   reducers: {
//     // Add reducers here if needed (e.g., to unlock items)
//     setSelectedCharacter: (state, action: PayloadAction<Character>) => {
//       state.selectedCharacter = action.payload;
//     },
//     setSkinColor: (state, action: PayloadAction<'black' | 'white'>) => {
//       state.skinColor = action.payload;
//     },
//     setGender: (state, action: PayloadAction<'boy' | 'girl'>) => {
//       state.gender = action.payload;
//     },
//     setSelectedSkinType: (state, action: PayloadAction<string>) => {
//       state.selectedSkinType = action.payload;
//     },
//     unlockItem: (
//       state,
//       action: PayloadAction<{ characterName: string; itemId: number }>
//     ) => {
//       const { characterName, itemId } = action.payload;
//       const character = state.characters.find(
//         (char) => char.name === characterName
//       );
//       if (character) {
//         const item = character.items.find((item) => item.id === itemId);
//         if (item) {
//           item.locked = false; // Unlock the item
//         }
//       }
//     },
//   },
// });

// // Selector to get items by character name
// export const selectItemsByCharacterName = (
//   state: { characters: CharactersState },
//   characterName: string
// ) => {
//   const character = state.characters.characters.find(
//     (char) => char.name === characterName
//   );
//   return character ? character.items : null;
// };

// export const {
//   setSelectedCharacter,
//   setSkinColor,
//   setGender,
//   setSelectedSkinType,
//   unlockItem,
// } = charactersSlice.actions;

// export default charactersSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { unlockItemService } from '../../services/userService';

interface Item {
  id: number;
  name: string;
  image: string;
  locked: boolean;
}

export interface Character {
  name: string;
  boy: {
    blackSkin: string;
    whiteSkin: string;
  };
  girl: {
    blackSkin: string;
    whiteSkin: string;
  };
  items: Item[];
  vehicle: string;
}

interface CharactersState {
  characters: Character[];
  selectedCharacter: Character | null;
  skinColor: 'black' | 'white';
  gender: 'boy' | 'girl';
  selectedSkinType: string;
  unlockItemStatus: 'idle' | 'loading' | 'succeeded' | 'failed'; // Track async status
  unlockItemError: string | null; // Store error if any
}

const initialState: CharactersState = {
  characters: [
    {
      name: 'Police',
      boy: { blackSkin: 'police-bb.jpg', whiteSkin: 'police-wb.jpg' },
      girl: { blackSkin: 'police-bg.jpg', whiteSkin: 'police-wg.jpg' },
      items: [
        { id: 1, name: 'Badge', image: 'police/props/1.png', locked: true },
        { id: 2, name: 'Hat', image: 'police/props/2.png', locked: true },
        { id: 3, name: 'Hat', image: 'police/props/3.png', locked: true },
        { id: 4, name: 'Hat', image: 'police/props/4.png', locked: true },
        { id: 5, name: 'Hat', image: 'police/props/5.png', locked: true },
        { id: 6, name: 'Hat', image: 'police/props/6.png', locked: true },
        { id: 7, name: 'Hat', image: 'police/props/7.png', locked: true },
        { id: 8, name: 'Hat', image: 'police/props/8.png', locked: true },
      ],
      vehicle: 'police-car.jpg',
    },
    {
      name: 'Doctor',
      boy: { blackSkin: 'doctor-bb.jpg', whiteSkin: 'doctor-wb.jpg' },
      girl: { blackSkin: 'doctor-bg.jpg', whiteSkin: 'doctor-wg.jpg' },
      items: [
        { id: 1, name: 'Badge', image: 'doctor/props/1.png', locked: true },
        { id: 2, name: 'Hat', image: 'doctor/props/2.png', locked: true },
        { id: 3, name: 'Hat', image: 'doctor/props/3.png', locked: true },
        { id: 4, name: 'Hat', image: 'doctor/props/4.png', locked: true },
        { id: 5, name: 'Hat', image: 'doctor/props/5.png', locked: true },
        { id: 6, name: 'Hat', image: 'doctor/props/6.png', locked: true },
        { id: 7, name: 'Hat', image: 'doctor/props/7.png', locked: true },
        { id: 8, name: 'Hat', image: 'doctor/props/8.png', locked: true },
        { id: 9, name: 'Hat', image: 'doctor/props/9.png', locked: true },
        { id: 10, name: 'Hat', image: 'doctor/props/10.png', locked: true },
      ],
      vehicle: 'ambulance.jpg',
    },
    {
      name: 'Engineer',
      boy: { blackSkin: 'engineer-bb.jpg', whiteSkin: 'engineer-wb.jpg' },
      girl: { blackSkin: 'engineer-bg.jpg', whiteSkin: 'engineer-wg.jpg' },
      items: [
        { id: 1, name: 'Badge', image: 'engineer/props/1.png', locked: true },
        { id: 2, name: 'Hat', image: 'engineer/props/2.png', locked: true },
        { id: 3, name: 'Hat', image: 'engineer/props/3.png', locked: true },
        { id: 4, name: 'Hat', image: 'engineer/props/4.png', locked: true },
        { id: 5, name: 'Hat', image: 'engineer/props/5.png', locked: true },
        { id: 6, name: 'Hat', image: 'engineer/props/6.png', locked: true },
        { id: 7, name: 'Hat', image: 'engineer/props/7.png', locked: true },
        { id: 8, name: 'Hat', image: 'engineer/props/8.png', locked: true },
        { id: 9, name: 'Hat', image: 'engineer/props/9.png', locked: true },
        { id: 10, name: 'Hat', image: 'engineer/props/10.png', locked: true },
      ],
      vehicle: 'engineering-truck.jpg',
    },
    {
      name: 'Scientist',
      boy: { blackSkin: 'scientist-bb.jpg', whiteSkin: 'scientist-wb.jpg' },
      girl: { blackSkin: 'scientist-bg.jpg', whiteSkin: 'scientist-wg.jpg' },
      items: [
        { id: 1, name: 'Badge', image: 'scientist/props/1.png', locked: true },
        { id: 2, name: 'Hat', image: 'scientist/props/2.png', locked: true },
        { id: 3, name: 'Hat', image: 'scientist/props/3.png', locked: true },
        { id: 4, name: 'Hat', image: 'scientist/props/4.png', locked: true },
        { id: 5, name: 'Hat', image: 'scientist/props/5.png', locked: true },
        { id: 6, name: 'Hat', image: 'scientist/props/6.png', locked: true },
        { id: 7, name: 'Hat', image: 'scientist/props/7.png', locked: true },
        { id: 8, name: 'Hat', image: 'scientist/props/8.png', locked: true },
        { id: 9, name: 'Hat', image: 'scientist/props/9.png', locked: true },
        { id: 10, name: 'Hat', image: 'scientist/props/10.png', locked: true },
      ],
      vehicle: 'research-van.jpg',
    },
    {
      name: 'Firefighter',
      boy: { blackSkin: 'firefighter-bb.jpg', whiteSkin: 'firefighter-wb.jpg' },
      girl: {
        blackSkin: 'firefighter-bg.jpg',
        whiteSkin: 'firefighter-wg.jpg',
      },
      items: [
        {
          id: 1,
          name: 'Badge',
          image: 'firefighter/props/1.png',
          locked: true,
        },
        { id: 2, name: 'Hat', image: 'firefighter/props/2.png', locked: true },
        { id: 3, name: 'Hat', image: 'firefighter/props/3.png', locked: true },
        { id: 4, name: 'Hat', image: 'firefighter/props/4.png', locked: true },
        { id: 5, name: 'Hat', image: 'firefighter/props/5.png', locked: true },
        { id: 6, name: 'Hat', image: 'firefighter/props/6.png', locked: true },
        { id: 7, name: 'Hat', image: 'firefighter/props/7.png', locked: true },
        { id: 8, name: 'Hat', image: 'firefighter/props/8.png', locked: true },
        { id: 9, name: 'Hat', image: 'firefighter/props/9.png', locked: true },
        {
          id: 10,
          name: 'Hat',
          image: 'firefighter/props/10.png',
          locked: true,
        },
      ],
      vehicle: 'fire-truck.jpg',
    },
  ],
  selectedCharacter: null,
  skinColor: 'black',
  gender: 'boy',
  selectedSkinType: 'bb',
  unlockItemStatus: 'idle', // Initialize async status
  unlockItemError: null, // Initialize error state
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
        state.unlockItemStatus = 'loading';
        state.unlockItemError = null;
      })
      .addCase(unlockItem.fulfilled, (state, action) => {
        state.unlockItemStatus = 'succeeded';
        const { characterName, gender, itemId } = action.meta.arg;
        const characterGenderKey = `${characterName}_${gender}`;
        const character = state.characters.find(
          (char) => char.name === characterName
        );
        if (character) {
          const item = character.items.find((item) => item.id === itemId);
          if (item) {
            item.locked = false; // Unlock item in local state
          }
        }
        console.log(
          `Item ${itemId} unlocked successfully for ${characterGenderKey}`
        );
      })
      .addCase(unlockItem.rejected, (state, action) => {
        state.unlockItemStatus = 'failed';
        state.unlockItemError = action.payload || 'Unknown error';
        console.error('Error unlocking item:', action.payload);
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
