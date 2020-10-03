import app from 'firebase/app';
import 'firebase/auth';
import firebase from 'firebase';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

class Firebase {
  auth;
  constructor() {
    if (!firebase.apps.length) {
      app.initializeApp(config);
    }
    this.auth = app.auth();
  }

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signUpWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.auth.signInWithPopup(provider);
  };

  getCurrentUser = () => {
    return this.auth.currentUser;
  };

  getToken = () => {
    return this.auth.currentUser.getIdToken(true);
  };

  isAuthenticated = () => {
    return this.auth.currentUser !== null;
  };

  signOut = () => {
    return this.auth.signOut();
  };
}

export default Firebase;
