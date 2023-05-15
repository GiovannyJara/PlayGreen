import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCRaQMm6z-8LY9XbsiLdmsTfl75wDQoyz0",
  authDomain: "playgreen-sports.firebaseapp.com",
  projectId: "playgreen-sports",
  storageBucket: "playgreen-sports.appspot.com",
  messagingSenderId: "1019070109320",
  appId: "1:1019070109320:web:ce66fe3b03861fa5e1b13d",
  measurementId: "G-TS2FY3GV7X"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
