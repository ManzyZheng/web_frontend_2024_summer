import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    // Fetch posts and set them in state
    axios.get('http://localhost:7001/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Failed to fetch posts:', error));
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7001/api/comments', {
        postId,
        authorId: 1, // example authorId
        content: newComment
      });
      setNewComment('');
      // Optionally fetch comments again or update UI
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <p>{post.content}</p>
          {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button type="submit">Comment</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default PostList;
