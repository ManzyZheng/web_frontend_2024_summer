import React from 'react';
import CircleList from '../components/Circles/CircleList';

const Home = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold">兴趣圈</h1>
      <CircleList />
    </div>
  );
};

export default Home;