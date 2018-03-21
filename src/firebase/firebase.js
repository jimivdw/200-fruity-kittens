import * as firebase from 'firebase';

const config = {
  "apiKey": "AIzaSyDG9AIU2LlnsJwseGZSxQD-nKWIFjYsdgU",
  "databaseURL": "https://fruity-kittens.firebaseio.com",
  "storageBucket": "fruity-kittens.appspot.com",
  "authDomain": "fruity-kittens.firebaseapp.com",
  "messagingSenderId": "189087846366",
  "projectId": "fruity-kittens"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const app = firebase.app();

export {
  app
};