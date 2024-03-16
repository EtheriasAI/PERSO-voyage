import React from 'react';
import logo from './logo.svg';
import './App.css';
import NewEntry from './SaveNewEntry';
import Entries from './Entries';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Entries />
        <NewEntry />
      </header>
    </div>
  );
}

export default App;
