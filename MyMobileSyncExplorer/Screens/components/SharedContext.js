// SharedContext.js
import React, { createContext, useContext, useState } from 'react';

const SharedContext = createContext();

export const SharedProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState('');

  const updateSharedState = (value) => {
    setSharedState(value);
  };

  return (
    <SharedContext.Provider value={{ sharedState, updateSharedState }}>
      {children}
    </SharedContext.Provider>
  );
};

export const useSharedContext = () => {
  return useContext(SharedContext);
};
