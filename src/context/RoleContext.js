import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  return (
    <RoleContext.Provider value={{ user, setUser }}>
      {children}
    </RoleContext.Provider>
  );
};

// Custom hook for easier access
export const useRole = () => useContext(RoleContext);
