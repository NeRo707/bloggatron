// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVucDlDyE3D4BEDsaiq3kAWPpoeL3wVDU",
  authDomain: "bloggatron707.firebaseapp.com",
  projectId: "bloggatron707",
  storageBucket: "bloggatron707.appspot.com",
  messagingSenderId: "582139372287",
  appId: "1:582139372287:web:568f7fb5c571c6dd0aa2ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Function to sign up a user with email and password
export async function signUpUser(email: string, password: string): Promise<UserCredential> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);  
    return userCredential;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

// Function to sign in a user with email and password
export async function signInUser(email: string, password: string): Promise<UserCredential> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

// Function to sign out the current user
export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

export { auth };
