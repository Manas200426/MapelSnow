
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJOU35MMwDmWXtWOiDuBsFi5ZYD8ms4JI",
  authDomain: "maplesnow-canada.firebaseapp.com",
  projectId: "maplesnow-canada",
  storageBucket: "maplesnow-canada.appspot.com",
  messagingSenderId: "310778205147",
  appId: "1:310778205147:web:d058a930ec7d36740e4dfe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export {app,auth}