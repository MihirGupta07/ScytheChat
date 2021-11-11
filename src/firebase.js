import firebase from 'firebase'
require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyDYylx64E956XlB1MUBtQDgW_lLNo0OsDM",
    authDomain: "scythechat-70f85.firebaseapp.com",
    projectId: "scythechat-70f85",
    storageBucket: "scythechat-70f85.appspot.com",
    messagingSenderId: "1033711194909",
    appId: "1:1033711194909:web:090bc960e6ae98dbb847f4"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;
