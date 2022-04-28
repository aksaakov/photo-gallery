import { initializeApp }  from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore, serverTimestamp  } from  'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBJTrPUKO92NIwS-iuMZXdhd44vTZFERY4",
  authDomain: "aksaakov.firebaseapp.com",
  projectId: "aksaakov",
  storageBucket: "aksaakov.appspot.com",
  messagingSenderId: "449903892884",
  appId: "1:449903892884:web:740b599c362845cdc71781",
  measurementId: "G-3TK2RGD75E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);

export { projectStorage, projectFirestore, serverTimestamp };

