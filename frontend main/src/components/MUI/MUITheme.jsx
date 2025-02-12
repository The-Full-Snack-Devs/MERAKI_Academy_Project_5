import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: 'Montserrat, Arial, sans-serif',
        },
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: darkMode ? '#f0592c' : '#f04f23', 
          },
          background: {
            default: darkMode ? '#414141' : '#ffffff',  // Ensure this changes
            paper: darkMode ? '#414141' : '#ffffff',
          },
          text: {
            primary: darkMode ? '#ffffff' : '#000000',
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
