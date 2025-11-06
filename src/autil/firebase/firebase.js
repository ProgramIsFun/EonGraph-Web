import 'firebase/auth';
// import 'firebase/database';
import 'firebase/firestore';


// import * as firebase from "firebase";
import {firebaseConfig} from "./config1";
import firebase from "firebase/app";

/**
 * Creates and initializes a Firebase app.
 */


// replace WITH ur own config!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const app = firebase.initializeApp(

    firebaseConfig


);

export default app;
export const dbbbbb = firebase.firestore();


export const auth = firebase.auth

