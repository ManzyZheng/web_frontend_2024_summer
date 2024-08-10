import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostList from '../components/Posts/PostList';
import CreatePost from '../components/Posts/CreatePost';

const Circle = () => {
  const { id } = useParams();
  const circleId = parseInt(id, 10);

  const [circle, setCircle] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchCircle = async () => {
    try {
      const response = await axios.get(`http://localhost:7001/api/circles/${circleId}`);
      if (response.data.success) {
        setCircle(response.data.circle);
      } else {
        console.error('Failed to load circle:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching circle:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:7001/api/posts/circle/${circleId}`);
      if (response.data.success) {
        setPosts(response.data.posts);
      } else {
        console.error('Failed to load posts:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostCreated = () => {
    fetchPosts(); // 刷新帖子列表
  };

  useEffect(() => {
    fetchCircle();
    fetchPosts();
  }, [circleId]);

  if (!circle) {
    return <div className="text-center mt-8">加载中...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">{circle.name}</h1>
        <p className="text-gray-700 mb-4">{circle.description}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">创建新帖子</h2>
        <CreatePost circleId={circleId} onPostCreated={handlePostCreated} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">帖子列表</h2>
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default Circle;
