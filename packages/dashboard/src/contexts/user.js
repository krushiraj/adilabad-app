
import React, { createContext, useState } from 'react';
import { readUser } from '../utils/localStorage';

// Create the user context
export const UserContext = createContext();

// Create a UserProvider component
export const UserProvider = ({ children }) => {
  const userFromStorage = readUser();

  const [user, setUser] = useState(userFromStorage);

  return (
    <UserContext.Provider value={[ user, setUser ]}>
      {children}
    </UserContext.Provider>
  );
};
