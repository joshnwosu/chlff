import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth } from '../configs/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../configs/firebase';

export const registerUserService = async (
  email: string,
  password: string,
  displayName: string,
  role: string // role
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(userCredential.user, { displayName });

  await setDoc(doc(db, 'users', userCredential.user.uid), {
    displayName,
    email,
    role,
  });
  return userCredential.user;
};

export const loginUserService = async (
  email: string,
  password: string
): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const updateUserProfileService = async (
  displayName: string
): Promise<void> => {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName });
  }
};
