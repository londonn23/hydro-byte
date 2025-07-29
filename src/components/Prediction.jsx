import React, { useState, useEffect } from 'react';
import './Prediction.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Prediction = () => {
  const [timeframe, setTimeframe] = useState('day');
  const [data, setData] = useState([]);

  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const newData = [];
      let intervals, labels;
      //, format

      switch (timeframe) {
        case 'day':
          intervals = 24;
          labels = (i) => `${(now.getHours() + i) % 24}:00`;
          break;
        case 'week':
          intervals = 7;
          labels = (i) => new Date(now.getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString();
          break;
        case 'month':
          intervals = 4;
          labels = (i) => `Week ${i + 1}`;
          break;
        case 'year':
          intervals = 12;
          labels = (i) => new Date(now.getFullYear(), now.getMonth() + i).toLocaleString('default', { month: 'long' });
          break;
        default:
          intervals = 24;
          labels = (i) => `${(now.getHours() + i) % 24}:00`;
      }

      for (let i = 0; i < intervals; i++) {
        newData.push({
          time: labels(i),
          level: Math.floor(Math.random() * 101),
        });
      }
      setData(newData);
    };

    generateData();
  }, [timeframe]);

  return (
    <div className="prediction-container">
      <div className="prediction-header">
        <h2>Water Level Predictions</h2>
        <select onChange={(e) => setTimeframe(e.target.value)} value={timeframe}>
          <option value="day">In a day</option>
          <option value="week">In a week</option>
          <option value="month">In a month</option>
          <option value="year">In a year</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="level" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Prediction;