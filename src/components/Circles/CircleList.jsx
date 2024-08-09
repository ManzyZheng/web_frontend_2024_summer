import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CircleList = () => {
  const [circles, setCircles] = useState([]);
  const navigate = useNavigate(); // 初始化 useNavigate 钩子

  useEffect(() => {
    const fetchCircles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:7001/api/circles');
        setCircles(response.data.circles); // 正确设置 circles 状态
      } catch (error) {
        console.error('Error fetching circles:', error);
      }
    };

    fetchCircles();
  }, []);

  // 处理圈子点击事件
  const handleCircleClick = (id) => {
    navigate(`/circle/${id}`); // 使用 navigate 跳转到指定圈子的详情页
  };

  return (
    <div>
      <h2>Circle List</h2>
      {Array.isArray(circles) && circles.length > 0 ? (
        circles.map(circle => (
          <div 
            key={circle.id} 
            onClick={() => handleCircleClick(circle.id)} // 添加点击事件
            style={{ cursor: 'pointer', marginBottom: '10px' }} // 添加一些样式方便用户交互
          >
            <h3>{circle.id} : {circle.name} created by {circle.creator}</h3>
            <p>{circle.description} </p>
          </div>
        ))
      ) : (
        <p>No circles available</p>
      )}
    </div>
  );
};

export default CircleList;
