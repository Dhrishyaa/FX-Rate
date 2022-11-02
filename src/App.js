import React from 'react';
import './App.css';
import Home from './Containers/Home';
import CardContextProvider from './Contexts/CardContext';

function App() {
  return (
    <div className="App">
      <CardContextProvider>
        <Home />
      </CardContextProvider>
    </div>
  );
}

export default App;
