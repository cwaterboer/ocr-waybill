import { auth } from "./firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
  updateProfile,
} from "firebase/auth"

export const signUp = async (email: string, password: string, name: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(userCredential.user, { displayName: name })
  return userCredential.user
}

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const signOut = () => {
  return firebaseSignOut(auth)
}

export const getCurrentUser = (): User | null => {
  return auth.currentUser
}

export const updateUserProfile = (user: User, profile: { displayName?: string; photoURL?: string }) => {
  return updateProfile(user, profile)
}

