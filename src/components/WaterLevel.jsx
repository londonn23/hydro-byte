import React, { useState } from 'react';
import './WaterLevel.css';

const WaterLevel = () => {
  const [waterLevel, setWaterLevel] = useState(75); // Initial water level

  const handleLevelChange = (level) => {
    setWaterLevel(level);
  };

  const getColor = (level) => {
    const red = 255 - (level / 100) * 255;
    const blue = (level / 100) * 255;
    return `rgb(${red}, 0, ${blue})`;
  };

  return (
    <div className="water-level-container">
      <h2>Live Water Level</h2>
      <div className="liquid-gauge-wrapper">
        <div className="liquid-gauge">
          <div
            className="liquid"
            style={{
              height: `${waterLevel}%`,
              backgroundColor: getColor(waterLevel),
            }}
          ></div>
        </div>
          <div className="button-container">
              <button onClick={() => handleLevelChange(100)}>100%</button>
              <button onClick={() => handleLevelChange(75)}>75%</button>
              <button onClick={() => handleLevelChange(50)}>50%</button>
              <button onClick={() => handleLevelChange(25)}>25%</button>
              <button onClick={() => handleLevelChange(0)}>0%</button>
          </div>
      </div>
      <p style={{textAlign: 'center', marginTop: '20px'}}>{waterLevel}% Full</p>
    </div>
  );
};

export default WaterLevel;