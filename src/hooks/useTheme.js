// src/hooks/useTheme.js

import { useState, useEffect, useContext, createContext } from 'react';

// 1. Create the Context
const ThemeContext = createContext();

// 2. The Provider Component
export const ThemeProvider = ({ children }) => {
  // Initialize state from local storage or default to 'light'
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  // 3. Effect to apply the theme class and save to local storage
  useEffect(() => {
    const root = document.documentElement; // The <html> element
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 4. Toggle function
  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  // 5. Provide the theme state and toggle function
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 6. The custom hook for easy consumption
export const useTheme = () => useContext(ThemeContext);