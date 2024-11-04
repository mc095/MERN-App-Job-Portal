import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyACdeJWBhaUXlLi6-DvfpuCnRBHqFTgCAQ",
    authDomain: "pushnotifications-184e5.firebaseapp.com",
    projectId: "pushnotifications-184e5",
    storageBucket: "pushnotifications-184e5.firebasestorage.app",
    messagingSenderId: "357335277892",
    appId: "1:357335277892:web:220a028a8d506cfa84b711",
    measurementId: "G-EG8P454DRZ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
