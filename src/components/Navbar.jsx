import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-100">
      <div className="container mx-auto flex justify-center items-center py-4 px-5">
        {/* 外层 div 添加了内边距（px-4），使其与页面边缘有一定的距离 */}
        <div className="flex space-x-8">
          <Link to="/home" className="text-xl font-semibold border border-blue-300 px-4 py-2 rounded hover:bg-blue-300">
            主页
          </Link>
          <Link to="/profile" className="border border-blue-300 px-4 py-2 rounded hover:bg-blue-300 text-xl font-semibold">
            个人资料
          </Link>
          <Link to="/login" className="border border-blue-300 px-4 py-2 rounded hover:bg-blue-300 text-xl font-semibold">
            登录
          </Link>
          <Link to="/register" className="border border-blue-300 px-4 py-2 rounded hover:bg-blue-300 text-xl font-semibold">
            注册
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
