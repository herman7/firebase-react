import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { firebaseAuth } from "./BaseConfig";
import { LoginFormValues, UserFormValues } from "../interfaces";

setPersistence(firebaseAuth, browserLocalPersistence);

const SignIn = async ({ email, password }: LoginFormValues) => {
  const result = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  return result;
};

const SignUp = async ({ email, password }: UserFormValues) => {
  const result = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  return result;
};

const SignOut = async () => {
  await signOut(firebaseAuth);
};

const TAuth = {
  SignIn,
  SignUp,
  SignOut
}

export default TAuth
