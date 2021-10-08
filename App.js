import React from 'react';

import AuthenticationProvider from './src/context/AuthenticationContext';
import PaginationProvider from './src/context/PaginationContext';

import Router from './src/components/Router';

const App = () => {
  return (
    <AuthenticationProvider>
      <PaginationProvider>
        <Router />
      </PaginationProvider>
    </AuthenticationProvider>
  );
};

export default App;
