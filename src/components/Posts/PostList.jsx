// src/components/Posts/PostList.jsx
import React, { useEffect, useState } from 'react';

const PostList = ({ circleId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/posts/${circleId}`);
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [circleId]);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="p-4 border mb-4">
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt="Post" className="mt-2" />}
        </div>
      ))}
    </div>
  );
};

export default PostList;
