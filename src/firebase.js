import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "first-e-commerce-71d37.firebaseapp.com",
  databaseURL: "https://first-e-commerce-71d37.firebaseio.com",
  projectId: "first-e-commerce-71d37",
  storageBucket: "first-e-commerce-71d37.appspot.com",
  messagingSenderId: "867574054697",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-BE07CMHELZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const storage = firebase.storage();
export const db = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
