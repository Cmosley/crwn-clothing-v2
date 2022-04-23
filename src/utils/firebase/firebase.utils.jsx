import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc 
} from 'firebase/firestore';

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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ 
  prompt: 'select_account' 
});


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalData) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
  
    try {
      await setDoc(userDocRef, { 
        displayName, 
        email, 
        createdAt 
      });
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }
  return userDocRef;
}
