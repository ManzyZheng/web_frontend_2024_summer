import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Circle from './pages/Circle';
import Profile from './pages/Profile';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PostDetail from './pages/PostDetail';
import { UserProvider } from './UserContext'; // 确保路径正确
import './App.css';
const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/circle/:id" element={<Circle />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/circle/:circleId/post/:postId" element={<PostDetail />} />  {/* 新增的路由 */}
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;