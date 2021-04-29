import firebase from "firebase/app";
import "firebase/database";

  var firebaseConfig = {
    apiKey: "AIzaSyD8dEmkeQi2O1kuh-PNyf3qs-RiK_UrGYg",
    authDomain: "shoppies-5e9a3.firebaseapp.com",
    databaseURL: "https://shoppies-5e9a3-default-rtdb.firebaseio.com",
    projectId: "shoppies-5e9a3",
    storageBucket: "shoppies-5e9a3.appspot.com",
    messagingSenderId: "1069381638867",
    appId: "1:1069381638867:web:2694c81a60d3b105421226",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase
