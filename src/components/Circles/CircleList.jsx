import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CircleList = () => {
  const [circles, setCircles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCircles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:7001/api/circles');
        setCircles(response.data.circles);
      } catch (error) {
        console.error('Error fetching circles:', error);
      }
    };

    fetchCircles();
  }, []);

  const handleCircleClick = (id) => {
    navigate(`/circle/${id}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">圈子列表</h2>
      {Array.isArray(circles) && circles.length > 0 ? (
        circles.map(circle => (
          <div
            key={circle.id}
            onClick={() => handleCircleClick(circle.id)}
            className="bg-white shadow-md rounded-lg p-4 mb-4 hover:bg-blue-50 cursor-pointer transition duration-300 ease-in-out"
          >
            <h3 className="text-xl font-bold text-blue-600">{circle.name}</h3>
            <p className="text-gray-600">{circle.description}</p>
            <p className="text-sm text-gray-500">创建者: {circle.creator}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">没有可用的圈子</p>
      )}
    </div>
  );
};

export default CircleList;
