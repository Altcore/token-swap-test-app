import React from 'react';
import Homepage from './views/Homepage';
import AppContextProvider from './context/AppContext';

function App() {
  return (
    <>
      <AppContextProvider>
        <Homepage />
      </AppContextProvider>
    </>
  );
}

export default App;
