import React from 'react';
import { useUser } from '../UserContext';
import CircleList from '../components/Circles/CircleList';
import CreateCircle from '../components/Circles/CreateCircle';

const Home = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-100 p-">
      <header className="bg-blue-400 text-white py-2 mb-3">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold">欢迎你, {user ? user.username : '请登录'}!</h1>
        </div>
      </header>
        <CreateCircle />
        <CircleList />
    </div>
  );
};

export default Home;


