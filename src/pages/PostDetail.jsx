import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';


const PostDetail = () => {
    const { circleId, postId } = useParams(); // 获取URL中的circleId和postId
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:7001/api/posts/circle/${circleId}/${postId}`);
                if (response.data.success) {
                    setPost(response.data.post);
                } else {
                    console.error('Failed to load post:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:7001/api/comments/circle/${circleId}/post/${postId}`);
                console.log("fetch comment");
                if (response.data.success) {
                    console.log(response.data.comment);
                    setComments(response.data.comments);
                } else {
                    console.error('Failed to load comments:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchPost();
        fetchComments();
    }, [circleId, postId]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) {
            return;
        }

        try {
            const response = await axios.post(`http://localhost:7001/api/comments`, {
                circleId: parseInt(circleId, 10),
                postId: parseInt(postId, 10),
                creator: user.username,
                content: newComment,
            });

            if (response.data.success) {
                setComments([...comments, response.data.comment]);
                setNewComment('');
                try {
                    console.log('update');
                    const response = await axios.post('http://localhost:7001/api/increaseActivity', { username: user.username });

                    // 更新用户状态（假设你的上下文中有setUser方法来更新用户信息）
                    setUser(response.data.data);
                    navigate('/Profile');
                } catch (error) {
                    console.error('Failed to update user activity:', error);
                }
            } else {
                console.error('Failed to add comment:', response.data.message);
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{post.content}</h1>
            <p>created by {post.creator}</p>
            <p>created at {post.createdAt}</p>
            {post.imagePaths && post.imagePaths.length > 0 && (
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

            <div>
                <h2>Comments</h2>
                {comments.map((comment, index) => (
                    <div key={index}>
                        <p>{index + 1} : {comment.content}</p>
                        <p>by {comment.creator} at {comment.createdAt}</p>
                    </div>
                ))}
                <div>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your comment..."
                    />
                    <button onClick={handleCommentSubmit} disabled={!user}> {/* 禁用按钮，直到用户登录 */}
                        Submit Comment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
