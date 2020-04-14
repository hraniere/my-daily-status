const firebase = require("firebase/app");
require("firebase/firestore");

firebaseConfig = {
  apiKey: "AIzaSyAJGGxReJsPPEogBvQIwPZVk_kIVwEzkqg",
  authDomain: "mydailystatus-1b8a8.firebaseapp.com",
  databaseURL: "https://mydailystatus-1b8a8.firebaseio.com",
  projectId: "mydailystatus-1b8a8",
  storageBucket: "mydailystatus-1b8a8.appspot.com",
  messagingSenderId: "1016586566965",
  appId: "1:1016586566965:web:5483f80a5e16408574a07c"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

db.collection('markers').get()
  .then(result => console.log(result))