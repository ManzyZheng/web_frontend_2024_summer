// src/pages/Circle.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../components/Posts/PostList';
import CreatePost from '../components/Posts/CreatePost';

const Circle = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">兴趣圈 {id}</h1>
      <CreatePost circleId={id} />
      <PostList circleId={id} />
    </div>
  );
};

export default Circle;
