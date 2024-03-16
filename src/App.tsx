import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './page/Home';
import Article from './page/Article';
import { createTheme, ThemeProvider } from '@mui/material';

// Define your MUI theme
const theme = createTheme();

function App() {
  return (

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article" element={<Article />} />
        </Routes>
      </Router>
  );
}

export default App;
