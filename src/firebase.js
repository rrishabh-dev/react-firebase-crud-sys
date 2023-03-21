import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

import 'firebase/compat/database';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBhPsjo-oNKx9ChK6rWiWIC8pOD16QknVg',
  authDomain: 'employee-crud-system.firebaseapp.com',
  projectId: 'employee-crud-system',
  storageBucket: 'employee-crud-system.appspot.com',
  messagingSenderId: '461244254403',
  appId: '1:461244254403:web:baadff5856b9dfb5c7ba76',
  measurementId: 'G-E7D0EDZL8Z'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

const fireDb = firebase.initializeApp(firebaseConfig).database().ref();
export { fireDb };
