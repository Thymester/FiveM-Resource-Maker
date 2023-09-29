import React, { useState, useEffect } from 'react';
import './App.css';
import FileCreator from './components/FileCreator';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('isDarkMode') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
    applyTheme(isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevIsDarkMode => !prevIsDarkMode);
  };

  const applyTheme = isDark => {
    const body = document.body;
    if (isDark) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  };

  useEffect(() => {
    applyTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="container">
      <div className="app-content">
        <div className="theme-toggle">
          <label>
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            Toggle Dark Mode
          </label>
        </div>
        <FileCreator />
      </div>
    </div>
  );
}

export default App;
