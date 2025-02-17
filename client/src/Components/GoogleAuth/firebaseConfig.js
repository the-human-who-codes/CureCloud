import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_NCiig8MhkPbZYaK7GwIPn3nJ_-PpW1Q",
  authDomain: "curecloud1.firebaseapp.com",
  projectId: "curecloud1",
  storageBucket: "curecloud1.firebasestorage.app",
  messagingSenderId: "885445417787",
  appId: "1:885445417787:web:3ca2b6c1696de8b329f51e",
  measurementId: "G-3VB8BZEKMP",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); // Add provider export
