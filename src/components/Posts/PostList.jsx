import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostList = ({ posts }) => {
  const navigate = useNavigate();

  if (!Array.isArray(posts)) {
    return <div>No posts available.</div>;
  }

  const handlePostClick = (circleId, postId) => {
    navigate(`/circle/${circleId}/post/${postId}`);
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} onClick={() => handlePostClick(post.circleId, post.id)}>
          <p>{post.id} : {post.content}</p>
          <p>created by {post.creator}</p>
          <p>created at {post.createdAt}</p>
          {Array.isArray(post.imagePaths) && post.imagePaths.length > 0 && (
            <div>
              {post.imagePaths.map((path, index) => (
                <img 
                  key={index} 
                  src={`http://localhost:7001/${path}`} 
                  alt={`Post image ${index + 1}`} 
                  style={{ marginRight: '10px', maxWidth: '100%', height: 'auto' }}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
