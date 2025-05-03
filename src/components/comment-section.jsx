import React, { useState, useEffect } from 'react';
import { usePosts } from './post-context';
import '../styles/comment-section.css';

const CommentSection = ({ postId, onCommentAdded }) => {
  const [newComment, setNewComment] = useState('');
  const { addComment } = usePosts();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode on mount and set up observer
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    };

    // Initial check
    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(postId, {
        id: Date.now(),
        text: newComment,
        user: 'liar_01',
        timestamp: new Date().toISOString()
      });
      setNewComment('');
      onCommentAdded?.();
    }
  };

  return (
    <div className={`comment-section ${isDarkMode ? 'dark-mode' : ''}`}>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className={`comment-input ${isDarkMode ? 'dark-mode' : ''}`}
        />
        <button 
          type="submit" 
          className={`comment-button ${isDarkMode ? 'dark-mode' : ''}`}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CommentSection;