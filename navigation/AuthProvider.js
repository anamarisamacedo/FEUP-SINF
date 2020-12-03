import React, { createContext, useState } from 'react';
import Firebase from 'firebase';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          login: async (email, password) => {
            try {
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
          }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };