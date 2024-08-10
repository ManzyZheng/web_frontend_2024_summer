import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostList = ({ posts }) => {
  const navigate = useNavigate();

  if (!Array.isArray(posts) || posts.length === 0) {
    return <div className="text-center text-gray-500">没有可用的帖子。</div>;
  }

  const handlePostClick = (circleId, postId) => {
    navigate(`/circle/${circleId}/post/${postId}`);
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => handlePostClick(post.circleId, post.id)}
          className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition duration-300 ease-in-out"
        >
          <p className="text-lg font-semibold">{post.content}</p>
          <p className="text-sm text-gray-500">由 {post.creator} 创建于 {new Date(post.createdAt).toLocaleString()}</p>
          {Array.isArray(post.imagePaths) && post.imagePaths.length > 0 && (
            <div className="mt-3 flex items-center justify-center bg-gray-100 p-2 rounded">
              <span className="text-gray-600 text-sm">内有图片</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
