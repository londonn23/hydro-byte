import React from 'react';
import './Header.css';

const Header = ({ toggleTheme }) => {
  return (
    <header className="header">
      <h1>HydroByte: Water Monitoring + Prediction</h1>
      <button onClick={toggleTheme} className="theme-toggle-button">
        Toggle Theme
      </button>
    </header>
  );
};

export default Header;