import React from 'react';
import Homepage from './views/Homepage';
import ThemeToggler from './components/ThemeToggler';
import AppContextProvider from './context/AppContext';

function App() {
  return (
    <>
      <ThemeToggler />
      <AppContextProvider>
        <Homepage />
      </AppContextProvider>
    </>
  );
}

export default App;
