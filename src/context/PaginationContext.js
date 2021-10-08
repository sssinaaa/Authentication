import React, {createContext, useState} from 'react';

export const PaginationContext = createContext();

const PaginationProvider = ({children}) => {
  const [token, setToken] = useState(0);

  return (
    <PaginationContext.Provider value={[token, setToken]}>
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationProvider;
