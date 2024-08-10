import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext';

const PostDetail = () => {
    const { circleId, postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { user, setUser } = useUser();
    const navigate = useNavigate(); // Create a navigate instance

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
                if (response.data.success) {
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
        if (!newComment.trim()) return;

        try {
            const response = await axios.post('http://localhost:7001/api/comments', {
                circleId: parseInt(circleId, 10),
                postId: parseInt(postId, 10),
                creator: user.username,
                content: newComment,
            });

            if (response.data.success) {
                setComments([...comments, response.data.comment]);
                setNewComment('');

                try {
                    const activityResponse = await axios.post('http://localhost:7001/api/increaseActivity', { username: user.username });
                    setUser(activityResponse.data.data);
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
        <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <button
                    onClick={() => navigate(-1)} // Go back to the previous page
                    className="px-4 py-2 bg-gray-300 text-black rounded-md shadow-sm hover:bg-gray-400"
                >
                    返回
                </button>
            </div>

            <div className="post-content mb-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-600">帖子</h2>
                <h1 className="text-1xl font-bold mb-2">{post.content}</h1>
                <p className="text-sm text-gray-500 mb-4">
                    由 {post.creator} 创建于 {new Date(post.createdAt).toLocaleString()}
                </p>
                {post.imagePaths && post.imagePaths.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.imagePaths.map((path, index) => (
                            <img
                                key={index}
                                src={`${path}`}
                                alt={`Post image ${index + 1}`}
                                className="w-full sm:w-1/2 lg:w-1/4 h-auto rounded-md shadow-sm"
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="comments-section">
                <h2 className="text-xl font-semibold mb-4 text-blue-600">评论</h2>
                <div className="space-y-4 mb-6">
                    {comments.map((comment, index) => (
                        <div key={index} className="p-4 bg-gray-100 rounded-md shadow-sm">
                            <p className="text-base">{index + 1} : {comment.content}</p>
                            <p className="text-xs text-gray-500">
                                由 {comment.creator} 于 {new Date(comment.createdAt).toLocaleString()} 创建
                            </p>
                        </div>
                    ))}
                </div>

                <div className="comment-form flex items-center">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="发表评论..."
                        className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleCommentSubmit}
                        disabled={!user}
                        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition duration-300"
                    >
                        提交评论
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
