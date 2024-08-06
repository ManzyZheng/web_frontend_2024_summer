import React from 'react';
import { useUser } from '../UserContext';
import CircleList from '../components/Circles/CircleList';
import CreateCircle from '../components/Circles/CreateCircle';

const Home = () => {
  const { user } = useUser();

  return (
    <>
      <div id="main">
        {user ? `欢迎你, ${user.username}!` : '请登录'}
      </div>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold">兴趣圈</h1>
        <CreateCircle/>
        <CircleList />
      </div>
    </>
  );
};

export default Home;

