import app from 'firebase/app';
import 'firebase/auth';
import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
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
