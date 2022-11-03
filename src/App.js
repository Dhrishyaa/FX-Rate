import React from 'react';
import './App.css';
import Header from './Containers/Header';
import Home from './Containers/Home';
import CardContextProvider from './Contexts/CardContext';

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <CardContextProvider>
          <Home />
        </CardContextProvider>
      </div>
    </>
  );
}

export default App;
