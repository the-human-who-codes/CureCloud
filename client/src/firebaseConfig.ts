import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBPIbQpEr6kQI3h0dHMvr1W3UnltZV4qMU",
    authDomain: "software-design-project-418012.firebaseapp.com",
    projectId: "software-design-project-418012",
    storageBucket: "software-design-project-418012.firebasestorage.app",
    messagingSenderId: "822343641891",
    appId: "1:822343641891:web:e975a8229bad832d5fba96"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); // Add provider export
