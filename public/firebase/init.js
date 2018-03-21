if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');
firebase.initializeApp({
  "apiKey": "AIzaSyDG9AIU2LlnsJwseGZSxQD-nKWIFjYsdgU",
  "databaseURL": "https://fruity-kittens.firebaseio.com",
  "storageBucket": "fruity-kittens.appspot.com",
  "authDomain": "fruity-kittens.firebaseapp.com",
  "messagingSenderId": "189087846366",
  "projectId": "fruity-kittens"
});