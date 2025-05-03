import React, { useState, useEffect, useCallback } from 'react';
import { usePosts } from '../components/post-context';
import PostCard from '../components/post-card';
import '../styles/styles.css';
import '../styles/home-page.css';
import '../styles/dark-mode.css';

const HomePage = () => {
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const { posts } = usePosts();

  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop + 100 >= 
      document.documentElement.offsetHeight && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setVisiblePosts(prev => prev + 2);
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleViewComments = (postId) => {
    setSelectedPostId(postId);
  };

  const selectedPost = posts.find(post => post.id === selectedPostId);

  return (
    <div className={`home-page ${selectedPostId ? 'comments-open' : ''}`}>
      <div className="post-feed">
        {sortedPosts.slice(0, visiblePosts).map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            onViewComments={handleViewComments}
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
            {selectedPost.comments.map(comment => (
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

export default HomePage;