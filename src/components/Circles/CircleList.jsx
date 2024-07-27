// src/components/Circles/CircleList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CircleList = () => {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    const fetchCircles = async () => {
      const response = await fetch('/api/circles');
      const data = await response.json();
      setCircles(data);
    };
    fetchCircles();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {circles.map(circle => (
        <Link to={`/circle/${circle.id}`} key={circle.id} className="p-4 border">
          {circle.name}
        </Link>
      ))}
    </div>
  );
};

export default CircleList;
