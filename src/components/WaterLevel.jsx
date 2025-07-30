import React, { useState, useEffect } from 'react';
import './WaterLevel.css';

const WaterLevel = () => {
  const [waterLevel, setWaterLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null); // Reset error state on new fetch
        const response = await fetch('https://script.google.com/macros/s/AKfycbxXSm_TM3D8Lrtf-wetdoeyrCEHi9lKfbKt2Xahx49db96aH1mRv8OXmnRoDKw9Rrn3/exec');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.waterLevel === undefined) {
            throw new Error("Invalid data format from API");
        }
        setWaterLevel(data.waterLevel);
      } catch (error) {
        console.error('Error fetching water level:', error);
        setError('Failed to fetch water level. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 1000); // Fetch every 1 second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const getColor = (level) => {
    if (level === null) return 'rgb(200, 200, 200)'; // Default color for loading/error
    const red = 255 - (level / 100) * 255;
    const blue = (level / 100) * 255;
    return `rgb(${red}, 0, ${blue})`;
  };

  return (
    <div className="water-level-container">
      <h2>Live Water Level</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
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
          <p style={{ textAlign: 'center', marginTop: '20px' }}>{waterLevel}% Full</p>
        </>
      )}
    </div>
  );
};

export default WaterLevel;