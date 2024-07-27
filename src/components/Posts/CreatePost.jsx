// src/components/Posts/CreatePost.jsx
import React, { useState } from 'react';

const CreatePost = ({ circleId }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append('circleId', circleId);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setContent('');
      setImage(null);
    } else {
      // 处理错误
    }
  };

  return (
    <div className="mb-4">
      <textarea
        className="w-full border px-3 py-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="输入帖子内容"
      />
      <input
        type="file"
        className="w-full border px-3 py-2"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2"
        onClick={handleCreatePost}
      >
        发布
      </button>
    </div>
  );
};

export default CreatePost;
