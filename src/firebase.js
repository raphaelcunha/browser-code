import Firebase from 'firebase';
const config = {
  apiKey: "AIzaSyD0iMja2uLfakYuc4waKMo6rx47jObPSVU",
  authDomain: "code-c7eae.firebaseapp.com",
  databaseURL: "https://code-c7eae.firebaseio.com",
  projectId: "code-c7eae",
  storageBucket: "code-c7eae.appspot.com",
  messagingSenderId: "284055458998"
};
Firebase.initializeApp(config);
export const firebase = Firebase;
export const db = Firebase.database();

