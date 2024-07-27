// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 获取用户数据
    const fetchUserData = async () => {
      const response = await fetch('/api/auth/profile');
      const data = await response.json();
      setUser(data);
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <h1>个人资料</h1>
      <p>用户名: {user.username}</p>
      <p>邮箱: {user.email}</p>
    </div>
  );
};

export default Profile;
