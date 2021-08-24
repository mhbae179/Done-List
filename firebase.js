import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
const fire = firebase.initializeApp({
    apiKey: "AIzaSyCk7KFxV8EIWzUf8BwV6Zbog5WmeT9tYr4",
    authDomain: "done-list-6bb8e.firebaseapp.com",
    projectId: "done-list-6bb8e",
    storageBucket: "done-list-6bb8e.appspot.com",
    messagingSenderId: "431179787213",
    appId: "1:431179787213:web:167c09d91fb2a3bd387284"
});
export const auth = fire.auth();
export const db = fire.firestore();
export default {
    fire,
};