import * as firebase from 'firebase';

const config = {
  "apiKey": "AIzaSyDG9AIU2LlnsJwseGZSxQD-nKWIFjYsdgU",
  "databaseURL": "https://fruity-kittens.firebaseio.com",
  "storageBucket": "fruity-kittens.appspot.com",
  "authDomain": "localhost",
  "messagingSenderId": "189087846366",
  "projectId": "fruity-kittens"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const app = firebase.app();
const db = firebase.database();

export {
  db,
  app
};