import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [circleId, setCircleId] = useState(1); // example circleId

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let imageUrl = '';
    if (image) {
      const formData = new FormData();
      formData.append('file', image);

      // Upload image and get the URL
      const imageUploadResponse = await axios.post('http://localhost:7001/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      imageUrl = imageUploadResponse.data.url;
    }

    try {
      await axios.post('http://localhost:7001/api/posts', {
        content,
        circleId,
        imageUrl
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
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Post</button>
    </form>
  );
};

export default CreatePost;

