import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
  apiKey: 'AIzaSyAEywqxbAhSQ0Uq6sJSw4A3FJHq8pLMVdY',
  authDomain: 'typescript-fd580.firebaseapp.com',
  projectId: 'typescript-fd580',
  storageBucket: 'typescript-fd580.appspot.com',
  messagingSenderId: '783816594741',
  appId: '1:783816594741:web:6d29528cd431d6b17b287c',
  measurementId: 'G-33PE5WLEL0',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
