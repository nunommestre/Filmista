// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC1xYnPg3Kh_XO-qZeieme_kKuQeYGl0A",
  authDomain: "filmista.firebaseapp.com",
  projectId: "filmista",
  storageBucket: "filmista.appspot.com",
  messagingSenderId: "1024939206788",
  appId: "1:1024939206788:web:0855fa09e9fd15c136bad1",
  measurementId: "G-09GFMW8JSJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export default getFirestore();
