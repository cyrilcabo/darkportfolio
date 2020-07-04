//Firebase utilities
import * as firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDLvYpXoZTgAkkgiRb4KtNxmdr-c34fXx0",
  authDomain: "portfolio-4b1af.firebaseapp.com",
  databaseURL: "https://portfolio-4b1af.firebaseio.com",
  projectId: "portfolio-4b1af",
  storageBucket: "portfolio-4b1af.appspot.com",
  messagingSenderId: "1001483288799",
  appId: "1:1001483288799:web:78f381abcf769a1299a96a",
  measurementId: "G-4SD67CT2JB"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const storageRef = storage.ref();

export default storageRef;