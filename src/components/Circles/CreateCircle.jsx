import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext'; // 假设你的用户上下文文件路径

const CreateCircle = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useUser(); // 获取当前用户信息
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:7001/api/circles', {
        name,
        description,
        creator: user.username, // 添加创建人信息
      });
      if (response.data.success) {
        navigate(`/circle/${response.data.circle.id}`);
      } else {
        setError('Failed to create circle. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-center">创建兴趣圈</h2>
      <form onSubmit={handleCreate} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="兴趣圈名称"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <textarea
            placeholder="描述"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows="2"
            required
          />
        </div>
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        <button
          type="submit"
          className={`w-full p-2 bg-blue-600 text-white rounded-md font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? '创建中...' : '创建'}
        </button>
      </form>
    </div>
  );
};

export default CreateCircle;
