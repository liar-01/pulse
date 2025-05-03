import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { users } from '../data';
import { usePosts } from '../components/post-context';
import PostCard from '../components/post-card';
import '../styles/post-page.css';
import '../styles/dark-mode.css';

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { posts } = usePosts();
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  // Find post and author using context data
  const currentPost = posts.find(p => p.id === Number(postId));
  const postAuthor = currentPost ? users.find(u => u.id === currentPost.userId) : null;
  const userPosts = currentPost 
    ? posts.filter(p => p.userId === currentPost.userId)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    : [];

  // Redirect if invalid post
  useEffect(() => {
    if (!currentPost || !postAuthor) {
      navigate('/not-found', { replace: true });
    }
  }, [currentPost, postAuthor, navigate]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setVisiblePosts(prev => Math.min(prev + 2, userPosts.length));
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoading, userPosts.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (!currentPost || !postAuthor) return null;

  return (
    <div className={`post-page ${selectedPostId ? 'comments-open' : ''}`}>
      <div className="post-feed">
        {userPosts.slice(0, visiblePosts).map(post => (
          <PostCard 
            key={post.id} 
            post={post}
            fullView={true}
            onViewComments={(postId) => {
              setSelectedPostId(postId);
            }}
          />
        ))}
        {isLoading && <div className="loading-indicator">Loading more posts...</div>}
      </div>

      {selectedPostId && (
        <div className="comments-sidebar">
          <div className="sidebar-header">
            <h3>Comments</h3>
            <button 
              className="close-button"
              onClick={() => setSelectedPostId(null)}
            >
              &times;
            </button>
          </div>
          <div className="comments-list">
            {posts.find(p => p.id === selectedPostId)?.comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-user">{comment.user}</div>
                <div className="comment-text">{comment.text}</div>
                <div className="comment-time">
                  {new Date(comment.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;