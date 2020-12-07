import React, { createContext, useState } from 'react';
import Firebase from 'firebase';
import queries from '../db/Database';

export const AuthContext = createContext({});
export var isManager = false;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          login: async (email, password) => {
            try {
              queries.isManager(email).then(response => {
                AuthProvider.IsManager = response;
                console.log("User " + email + " is " + (response? "" : "not ") + "a Manager!");
              });
              await Firebase.auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
              return false;
            }
          },
          register: async (email, password) => {
            try {
              await Firebase.auth().createUserWithEmailAndPassword(email, password);
              return "";
            } catch (e) {
              return e.message;
            }
          },
          logout: async () => {
            try {
              await Firebase.auth().signOut();
            } catch (e) {
              console.error(e);
            }
          },
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };