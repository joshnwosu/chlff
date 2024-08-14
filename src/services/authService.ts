import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../configs/firebase';

export const registerUserService = async (
  email: string,
  password: string,
  displayName: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(userCredential.user, { displayName });
  return userCredential.user;
};
