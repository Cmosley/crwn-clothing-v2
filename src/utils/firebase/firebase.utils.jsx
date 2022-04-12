import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD3tT5NfeowMnIMFMLnjwLB7YZCaDMgOn4",
  authDomain: "crwn-clothing-db-4cfd7.firebaseapp.com",
  projectId: "crwn-clothing-db-4cfd7",
  storageBucket: "crwn-clothing-db-4cfd7.appspot.com",
  messagingSenderId: "404829270789",
  appId: "1:404829270789:web:e76e9a2f22ff0681ffbd6c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ 
  prompt: 'select_account' 
});


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);