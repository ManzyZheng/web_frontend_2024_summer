import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../UserContext'; // 假设你的用户上下文文件路径

const CreatePost = ({ circleId }) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const { user } = useUser(); // 获取当前用户信息
  const [errorMessage, setErrorMessage] = useState(null); // 用于存储错误信息

  // 处理图片选择
  const handleImageChange = (e) => {
    const files = e.target.files;
  
    if (files.length > 0) {
      setImages(Array.from(files)); // 确保正确转换文件列表为数组并存储到 state 中
      console.log('Selected files:', files);
      console.log('Number of files selected:', files.length);
    } else {
      console.log('No files selected');
    }
  };
  

  // 提交表单
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let imageUrls = [];
    if (images.length > 0) {
      const formData = new FormData();
      
      // 将每个文件添加到 formData
      for (const image of images) {
        formData.append('files', image); // 'files' 用于上传多个文件
      }
  
      try {
        const imageUploadResponse = await axios.post('http://localhost:7001/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Image upload response:', imageUploadResponse.data);
        imageUrls = imageUploadResponse.data.urls;
      } catch (error) {
        console.error('Failed to upload images:', error);
        return;
      }
    }
  
    try {
      await axios.post('http://localhost:7001/api/posts', {
        content,
        creator: user.username,
        circleId: Number(circleId),
        imageUrls
      });
      // Handle success (e.g., navigate or show a message)
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        required // 添加required确保内容不为空
      />
      <input 
        type="file" 
        accept="image/*" 
        multiple // 允许选择多个图片
        onChange={handleImageChange} 
      />
      <button type="submit">Post</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* 显示错误信息 */}
    </form>
  );
};

export default CreatePost;
