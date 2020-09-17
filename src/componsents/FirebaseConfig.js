import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyBIwMJ08EkNVwbjrwb2HnXTaYhNzg234iw",
    authDomain: "prikup-app.firebaseapp.com",
    databaseURL: "https://prikup-app.firebaseio.com",
    projectId: "prikup-app",
    storageBucket: "prikup-app.appspot.com",
    messagingSenderId: "275206901856",
    appId: "1:275206901856:web:2b0034b3d1234ed3c7b305",
    measurementId: "G-C8RM9D3WN4"
  };
  
firebase.initializeApp(firebaseConfig);

async function getToken(){
  return await auth.currentUser.getIdToken();
}

export const auth = firebase.auth();
export const firebaseProvider = firebase;
export {getToken};

