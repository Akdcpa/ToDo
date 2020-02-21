 
import firebase from 'firebase' 
 
const firebaseConfig = {
    apiKey: "AIzaSyBLXPzQ6_czRif1OGLcspFpKrpOAzUvzKg",
    authDomain: "todo-f3686.firebaseapp.com",
    databaseURL: "https://todo-f3686.firebaseio.com",
    projectId: "todo-f3686",
    storageBucket: "todo-f3686.appspot.com",
    messagingSenderId: "41597844625",
    appId: "1:41597844625:web:d6f956cd3a16a92539d330",
    measurementId: "G-D7QC32Y2P1"
} 
const database = firebase.initializeApp(firebaseConfig) ;
 export default database ;
