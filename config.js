import Firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDiHGyvCIdS47a2IVzgXeux5A37Wptz114",
    authDomain: "react-firebase-bfbe7.firebaseapp.com",
    databaseURL: "https://react-firebase-bfbe7.firebaseio.com",
    projectId: "react-firebase-bfbe7",
    storageBucket: "react-firebase-bfbe7.appspot.com",
    messagingSenderId: "722858081202",
    appId: "1:722858081202:web:c11d4295f506fa3c2d02ab",
    measurementId: "G-6MN71Q5EEH"
};

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();