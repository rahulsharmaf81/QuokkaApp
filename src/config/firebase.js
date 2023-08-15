// Import the functions you need from the SDKs you need
// import * as firebase from 'firebase';
import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWRd0swnIkM_2KiCtrI2Y99bq93VHHFkk",
  authDomain: "quakkaapp.firebaseapp.com",
  projectId: "quakkaapp",
  storageBucket: "quakkaapp.appspot.com",
  messagingSenderId: "959380202507",
  appId: "1:959380202507:web:74fa887a768c33a48a530e",
  measurementId: "G-5KFG3KQRFL"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);