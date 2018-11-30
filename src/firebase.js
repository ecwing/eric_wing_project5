import firebase from "firebase";

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCyaUEgZR2IUyqNsjZaHl5GRStFZVybBIo",
    authDomain: "project-5-bujo.firebaseapp.com",
    databaseURL: "https://project-5-bujo.firebaseio.com",
    projectId: "project-5-bujo",
    storageBucket: "project-5-bujo.appspot.com",
    messagingSenderId: "818330020426"
  };
  firebase.initializeApp(config);
// this exports the CONFIGURED version of firebase
export default firebase;
