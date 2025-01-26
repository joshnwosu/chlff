import { auth } from '../configs/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../configs/firebase';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: string;
  assessmentPassed: boolean; // Indicates if the assessment was passed
  assessmentScore: number; // Score achieved in assessments
  totalTimePlayed: number; // Total time spent playing (in seconds or milliseconds)
  totalSuccessfulMissions: number; // Total number of successful missions
  items: string[]; // Items collected during gameplay
  year: number;
}

export const getUserProfileService = async (): Promise<UserProfile | null> => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('No user is currently authenticated');
  }

  const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

  if (userDoc.exists()) {
    const userData = userDoc.data();
    return {
      uid: currentUser.uid,
      displayName: userData.displayName,
      email: userData.email,
      role: userData.role,
      assessmentPassed: userData.assessmentPassed || false, // Default to false
      assessmentScore: userData.assessmentScore || 0, // Default to 0
      totalTimePlayed: userData.totalTimePlayed || 0, // Default to 0
      totalSuccessfulMissions: userData.totalSuccessfulMissions || 0, // Default to 0
      items: userData.items || [], // Default to empty array
      year: userData.year || 0,
    };
  } else {
    return null; // User profile not found
  }
};
