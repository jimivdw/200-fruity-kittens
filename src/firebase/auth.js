import * as firebase from 'firebase';
import { getOrCreateUser } from './db';

function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

export function signIn(googleUser) {
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.getAuthResponse().id_token);
      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential)
        .then((user) => getOrCreateUser(user.uid, user.displayName, user.email)
          .then((localUser) => {
            window.dispatchEvent(new CustomEvent('user-change', { detail: { userId: localUser.id } }));
          })
        )
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log('User already signed-in Firebase.');
      getOrCreateUser(firebaseUser.uid, firebaseUser.displayName, firebaseUser.email)
          .then((localUser) => {
            window.dispatchEvent(new CustomEvent('user-change', { detail: { userId: localUser.id } }));
          })
    }
  });
}

export function signOut() {
  firebase.auth().signOut().then(function () {
    window.dispatchEvent(new CustomEvent('user-change', { detail: { userId: null } }));
    }).catch(function (error) {
    console.log(error)
  });
}

export function isAuthenticated() {
  let user = firebase.auth().currentUser;
  if (user) {
    return true;
  }
  return false;
}