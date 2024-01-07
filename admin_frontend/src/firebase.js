// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANWZHQ02ZEQU715g6JVHXq0PwhRUtL8EI",
  authDomain: "cybershark-ab9e8.firebaseapp.com",
  projectId: "cybershark-ab9e8",
  storageBucket: "cybershark-ab9e8.appspot.com",
  messagingSenderId: "792309144705",
  appId: "1:792309144705:web:b5b640985d02937bd48180",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
