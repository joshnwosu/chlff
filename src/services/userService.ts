import { auth } from '../configs/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../configs/firebase';

// Define UserProfile interface with optional fields where applicable
export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: string;
  assessmentPassed: boolean; // Indicates if the assessment was passed
  assessmentScore: number; // Score achieved in assessments
  totalTimePlayed: number; // Total time spent playing (in seconds)
  totalSuccessfulMissions: number; // Total number of successful missions
  totalFailedMissions: number; // Total number of failed missions
  // items: string[]; // Items collected during gameplay
  items: {
    [characterGenderKey: string]: {
      unlockedItemIds: number[]; // Array of item IDs unlocked for this character
    };
  };
  year: number; // Consider making optional if not always present
  level: number; // Consider making optional if not always present
  gender: 'boy' | 'girl'; // Consider making optional if not always present
  skin: string; // Consider making optional if not always present
  character: string; // Consider making optional if not always present
  fishGameInfo: {
    level: number;
    totalTimePlayed: number;
    totalSuccessfulMissions: number;
    totalFailedMissions: number;
  };
  carGameInfo: {
    level: number;
    totalTimePlayed: number;
    totalSuccessfulMissions: number;
    totalFailedMissions: number;
  };
}

export const getUserProfileService = async (): Promise<UserProfile | null> => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('No user is currently authenticated');
  }

  try {
    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Default values for nested game info
      const defaultGameInfo = {
        level: 1, // Default level if missing
        totalTimePlayed: 0,
        totalSuccessfulMissions: 0,
        totalFailedMissions: 0,
      };

      return {
        uid: currentUser.uid,
        displayName: userData.displayName || 'Unknown', // Default if missing
        email: userData.email || currentUser.email || '', // Fallback to auth email
        role: userData.role || 'user', // Default role
        assessmentPassed: userData.assessmentPassed ?? false, // Nullish coalescing for cleaner default
        assessmentScore: userData.assessmentScore ?? 0,
        totalTimePlayed: userData.totalTimePlayed ?? 0,
        totalSuccessfulMissions: userData.totalSuccessfulMissions ?? 0,
        totalFailedMissions: userData.totalFailedMissions ?? 0,
        items: userData.items || {},
        year: userData.year ?? 1, // Default to current year
        level: userData.level ?? 1, // Default starting level
        gender: userData.gender || '', // Default if not set
        skin: userData.skin || '', // Default skin
        character: userData.character || '', // Default character
        fishGameInfo: userData.fishGameInfo || defaultGameInfo, // Default if missing
        carGameInfo: userData.carGameInfo || defaultGameInfo, // Default if missing
      };
    } else {
      console.warn(`No profile found for user ${currentUser.uid}`);
      return null; // User profile not found
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile from Firestore');
  }
};

export const updateUserProfileService = async (
  uid: string,
  updatedData: Partial<UserProfile>
): Promise<void> => {
  const currentUser = auth.currentUser;

  if (!currentUser || currentUser.uid !== uid) {
    throw new Error('Unauthorized or no user authenticated');
  }

  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, updatedData);
    console.log(`Profile updated for user ${uid}`);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update user profile in Firestore');
  }
};

export const unlockItemService = async (
  uid: string,
  characterName: string,
  gender: 'boy' | 'girl',
  itemId: number
): Promise<void> => {
  const currentUser = auth.currentUser;

  if (!currentUser || currentUser.uid !== uid) {
    throw new Error('Unauthorized or no user authenticated');
  }

  const characterGenderKey = `${characterName}_${gender}`;

  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error('User profile not found');
    }

    const userData = userDoc.data();
    const currentItems = userData.items || {};

    // Initialize character-gender entry if it doesn't exist
    const characterData = currentItems[characterGenderKey] || {
      unlockedItemIds: [],
    };

    // Add itemId if not already unlocked
    if (!characterData.unlockedItemIds.includes(itemId)) {
      characterData.unlockedItemIds.push(itemId);
    }

    // Update items object
    currentItems[characterGenderKey] = characterData;

    await updateDoc(userRef, { items: currentItems });
    console.log(
      `Unlocked item ${itemId} for ${characterGenderKey} for user ${uid}`
    );
  } catch (error) {
    console.error('Error unlocking item:', error);
    throw new Error('Failed to unlock item in Firestore');
  }
};
