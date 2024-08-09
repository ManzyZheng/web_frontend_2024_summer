import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostList from '../components/Posts/PostList';
import CreatePost from '../components/Posts/CreatePost';

const Circle = () => {
  // 获取路由参数中的 id，并转换为数字类型
  const { id } = useParams();
  const circleId = parseInt(id, 10);

  const [circle, setCircle] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchCircle = async () => {
      try {
        const response = await axios.get(`http://localhost:7001/api/circles/${circleId}`);
        if (response.data.success) {  // 检查请求是否成功
          console.log("Circle data:", response.data.circle); // 调试输出
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
        if (response.data.success) {  // 检查请求是否成功
          setPosts(response.data.posts);
        } else {
          console.error('Failed to load posts:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchCircle();
    fetchPosts();
  }, [circleId]);

  if (!circle) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{circle.name}</h1>
      <p>{circle.description}</p>
      <CreatePost circleId={circleId} />
      <PostList posts={posts} />
    </div>
  );
};

export default Circle;

