import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import WaterLevel from './components/WaterLevel';
import Prediction from './components/Prediction';
import './dark-mode.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`App ${theme}`}>
      <Header toggleTheme={toggleTheme} />
      <main className="main-container">
        <div className="left-container">
          <WaterLevel />
        </div>
        <div className="right-container">
          <Prediction />
        </div>
      </main>
    </div>
  );
}

export default App;
