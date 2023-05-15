import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Login from './public/login/login';
import Sport from './private/sport';
import History from './private/history-sport';


const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    transition: background-color 0.3s ease;
  }
`;

const lightTheme = {
  background: '#ffffff',
  text: '#000000',
  primary: 'blue',
};

const darkTheme = {
  background: '#000000',
  text: '#ffffff',
  primary: 'red',
};

const App = () => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <button onClick={toggleTheme}>Cambiar Tema</button>
      </div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sport" element={<Sport />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
