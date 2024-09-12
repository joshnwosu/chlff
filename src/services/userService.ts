import { auth } from '../configs/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../configs/firebase';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: string;
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
    };
  } else {
    return null; // User profile not found
  }
};
