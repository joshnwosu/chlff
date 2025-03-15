import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth } from '../configs/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../configs/firebase';
import { UserProfile } from './userService';

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

// login with emal & password
export const loginUserService = async (
  email: string,
  password: string
): Promise<{ user: User; role: string }> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  // Fetch user role from Firestore
  const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
  const role = userDoc.exists() ? userDoc.data()?.role : '';

  return { user: userCredential.user, role };
};

// login with displayName/email & password
// TODO: Not working yet. Permission issue
export const _loginUserService = async (
  identifier: string, // This can be either display name or email
  password: string
): Promise<{ user: User; role: string }> => {
  let email = identifier;

  // If the identifier is not an email, treat it as a display name
  if (!identifier.includes('@')) {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', identifier)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      email = querySnapshot.docs[0].data().email; // Retrieve email from the user document
    } else {
      throw new Error('No user found with the provided display name');
    }
  }

  // Now use the email to sign in with email and password
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Fetch the user role from Firestore
  const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
  const role = userDoc.exists() ? userDoc.data()?.role : '';

  return { user: userCredential.user, role };
};

// export const updateUserProfileService = async (
//   displayName: string
// ): Promise<void> => {
//   if (auth.currentUser) {
//     await updateProfile(auth.currentUser, { displayName });
//   }
// };

export const updateUserProfileService = async (
  uid: string,
  updatedData: Partial<UserProfile>
) => {
  const userDocRef = doc(db, 'users', uid);

  await updateDoc(userDocRef, updatedData);
  // console.log('User profile updated successfully');
};
