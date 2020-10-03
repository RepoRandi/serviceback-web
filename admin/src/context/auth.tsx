import React from 'react';
import Firebase from '../config/firebase';

type AuthProps = {
  isAuthenticated: boolean;
  authenticate: Function;
  signout: Function;
};

export const AuthContext = React.createContext({} as AuthProps);
const firebase = new Firebase();

const isValidToken = () => {
  const token = localStorage.getItem('idToken');
  if (token) return true;
  return false;
};

const AuthProvider = (props: any) => {
  const [isAuthenticated, makeAuthenticated] = React.useState(isValidToken());
  async function authenticate({ email, password }, cb) {
    await firebase.signInWithEmailAndPassword(email, password);

    const user = firebase.getCurrentUser();
    if (user) {
      firebase.getToken().then(idToken => {
        localStorage.setItem('idToken', idToken);
      });
    }

    makeAuthenticated(true);
    cb();
  }
  async function signout(cb) {
    makeAuthenticated(false);
    localStorage.removeItem('idToken');
    await firebase.signOut();
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
