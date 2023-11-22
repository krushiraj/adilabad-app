import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDtxBCDrOqP9UbHSbt3DEtjGShKbngLe7U",
  authDomain: "adb-app-krushi.firebaseapp.com",
  projectId: "adb-app-krushi",
  storageBucket: "adb-app-krushi.appspot.com",
  messagingSenderId: "492096272863",
  appId: "1:492096272863:web:c36c4bee4616037390ec6a",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}