import React from 'react';
import { useUser } from '../UserContext';

const Profile = () => {
  const { user } = useUser();

  if (!user) {
    return <div className="text-center mt-8">加载中...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">个人资料</h1>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">用户名:</p>
            <p className="text-lg font-semibold">{user.username}</p>
          </div>
          <div>
            <p className="text-gray-600">活跃度:</p>
            <p className="text-lg font-semibold">{user.activity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
