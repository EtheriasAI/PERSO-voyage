import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './page/Home';
import Article from './page/Article';
import { createTheme } from '@mui/material';
import PasswordPage from './page/Password';

// Define your MUI theme
const theme = createTheme();

function App() {

  const [passwordCorrect, setPasswordCorrect] = useState(
    localStorage.getItem('authenticated') === 'true'
  );

  return (

      <Router>
        <Routes>
          <Route path="/" element={passwordCorrect ? <Home /> : <Navigate to="/password" />} />
          <Route path="/" element={<Home />} />
          <Route path="/article" element={passwordCorrect ? <Article /> : <Navigate to="/password" />} />
          <Route path="/password" element={<PasswordPage setPasswordCorrect={setPasswordCorrect} />} />

        </Routes>
      </Router>
  );
}

export default App;
