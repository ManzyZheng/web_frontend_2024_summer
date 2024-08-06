import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CircleList = () => {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    const fetchCircles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:7001/api/circles');
        setCircles(response.data);
      } catch (error) {
        console.error('Error fetching circles:', error);
      }
    };

    fetchCircles();
  }, []);

  return (
    <div>
      <h2>Circle List</h2>
      {Array.isArray(circles) ? (
        circles.map(circle => (
          <div key={circle.id}>
            <h3>{circle.name}</h3>
            <p>{circle.description}</p>
          </div>
        ))
      ) : (
        <p>No circles available</p>
      )}
    </div>
  );
};

export default CircleList;

