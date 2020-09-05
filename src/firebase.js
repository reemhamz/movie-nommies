import firebase from "firebase/app";
import "firebase/database";

  const config = {
    apiKey: "AIzaSyAq2pWwyd4AkP1FqRzfWHvYGX6XYgKMf70",
    authDomain: "movie-noms.firebaseapp.com",
    databaseURL: "https://movie-noms.firebaseio.com",
    projectId: "movie-noms",
    storageBucket: "movie-noms.appspot.com",
    messagingSenderId: "303780556988",
    appId: "1:303780556988:web:83b3759d4a9e1e0402e0b9"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  export default config