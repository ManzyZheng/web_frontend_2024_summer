import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext'; // 假设你的用户上下文文件路径

const CreateCircle = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useUser(); // 获取当前用户信息
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:7001/api/circles', {
        name,
        description,
        creator: user.username, // 添加创建人信息
      });
      if (response.data.success) {
        navigate(`/circle/${response.data.circle.id}`);
      } else {
        console.log("Failed to create circle");
      }
    } catch (err) {
      console.log("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h2>创建兴趣圈</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="兴趣圈名称"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="描述"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">创建</button>
      </form>
    </div>
  );
};

export default CreateCircle;

