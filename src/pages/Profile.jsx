import React from 'react';
import { useUser } from '../UserContext';

const Profile = () => {
  const { user } = useUser();

  if (!user) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <h1>个人资料</h1>
      <p>用户名: {user.username}</p>
      <p>活跃度: {user.activity}</p>
    </div>
  );
};

export default Profile;
