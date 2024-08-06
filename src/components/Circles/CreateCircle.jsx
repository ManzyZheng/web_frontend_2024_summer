import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCircle = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/circles', {
        name,
        description,
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
