import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchedMoveDetails, setSearchedMoveDetails] = useState('');

  return (
    <SearchContext.Provider value={{ searchedMoveDetails, setSearchedMoveDetails }}>
      {children}
    </SearchContext.Provider>
  );
};
