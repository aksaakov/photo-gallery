import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

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
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };

