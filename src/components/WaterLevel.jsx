import React, { useState, useEffect } from 'react';
import './WaterLevel.css';

const WaterLevel = () => {
  const [waterLevel, setWaterLevel] = useState(75); // Initial water level

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxXSm_TM3D8Lrtf-wetdoeyrCEHi9lKfbKt2Xahx49db96aH1mRv8OXmnRoDKw9Rrn3/exec');
        const text = await response.text();
        const newWaterLevel = parseFloat(text);
        if (!isNaN(newWaterLevel)) {
          setWaterLevel(newWaterLevel);
        } else {
          console.error('Error: Fetched data is not a number');
        }
      } catch (error) {
        console.error('Error fetching water level:', error);
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

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
      </div>
      <p style={{textAlign: 'center', marginTop: '20px'}}>{waterLevel}% Full</p>
    </div>
  );
};

export default WaterLevel;