import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);

  return result.user;
};

export const signUpWithEmail = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  return userCredential.user;
};


