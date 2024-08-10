import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ circleId }) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const { user, setUser } = useUser();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setImages(Array.from(files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrls = [];
    if (images.length > 0) {
      const formData = new FormData();
      for (const image of images) {
        formData.append('files', image);
      }
      try {
        const imageUploadResponse = await axios.post('http://localhost:7001/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imageUrls = imageUploadResponse.data.urls;
      } catch (error) {
        setErrorMessage('图片上传失败，请稍后再试。');
        return;
      }
    }

    try {
      const postResponse = await axios.post('http://localhost:7001/api/posts', {
        content,
        creator: user.username,
        circleId: Number(circleId),
        imageUrls,
      });

      if (postResponse.data.success) {
        try {
          const response = await axios.post('http://localhost:7001/api/increaseActivity', { username: user.username });
          setUser(response.data.data);
          navigate('/Profile');
        } catch (error) {
          console.error('Failed to update user activity:', error);
        }
      }
    } catch (error) {
      setErrorMessage('帖子创建失败，请稍后再试。');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-4 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <textarea
            className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="你在想什么?"
            rows="3" // 调整文本域高度
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <input
            className="block w-auto text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            type="submit"
          >
            发布
          </button>
        </div>
        {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
