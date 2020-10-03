import React, { useReducer } from 'react';
import { AuthContext } from './auth.context';
import Firebase from '../../utils/firebase';
const isBrowser = typeof window !== 'undefined';
const INITIAL_STATE = {
  isAuthenticated: isBrowser && !!localStorage.getItem('idToken'),
  currentForm: 'signIn',
};
const firebase = new Firebase();

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SIGNIN':
      return {
        ...state,
        currentForm: 'signIn',
      };
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isAuthenticated: false,
      };
    case 'SIGNUP':
      return {
        ...state,
        currentForm: 'signUp',
      };
    case 'FORGOTPASS':
      return {
        ...state,
        currentForm: 'forgotPass',
      };
    default:
      return state;
  }
}

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);

  async function authenticate({ email, password }, cb) {
    await firebase.signInWithEmailAndPassword(email, password);

    const user = firebase.getCurrentUser();
    if (user) {
      firebase.getToken().then((idToken) => {
        localStorage.setItem('idToken', idToken);
      });
    }

    cb();
  }

  async function refreshToken() {
    const user = firebase.getCurrentUser();
    if (user) {
      firebase.getToken().then((idToken) => {
        localStorage.setItem('idToken', idToken);
      });
    }
  }

  async function signup({ email, password }, cb) {
    await firebase.signUpWithEmailAndPassword(email, password);

    const user = firebase.getCurrentUser();
    if (user) {
      firebase.getToken().then((idToken) => {
        localStorage.setItem('idToken', idToken);
      });
    }

    cb();
  }

  async function authenticateWithGoogle(cb) {
    await firebase.signInWithGoogle();

    const user = firebase.getCurrentUser();

    if (user) {
      firebase.getToken().then((idToken) => {
        localStorage.setItem('idToken', idToken);
      });
    }

    cb();
  }

  async function signout(cb) {
    localStorage.removeItem('idToken');
    await firebase.signOut();
    cb();
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        authenticate,
        authenticateWithGoogle,
        signout,
        signup,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
