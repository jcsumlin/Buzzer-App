import firebase from 'firebase';


const config = {
    apiKey: "YOUR KEY",
    authDomain: "YOUR AUTH",
    databaseURL: "DB URL"
};
firebase.initializeApp(config);
export const db = firebase.database();