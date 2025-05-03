import React, { useState, useEffect } from 'react';
import { usePosts } from './post-context';
import '../styles/comment-modal.css';
import '../styles/dark-mode.css';

const CommentModal = ({ postId, comments = [], onClose }) => {
  const [newComment, setNewComment] = useState('');
  const { addComment } = usePosts();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode detection
  useEffect(() => {
    setIsDarkMode(document.body.classList.contains('dark-mode'));
    
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    });
    
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
        text: newComment, 
        user: 'liar_01',
        timestamp: new Date().toISOString()
      });
      setNewComment('');
    }
  };

  return (
    <div className={`modal-overlay ${isDarkMode ? 'dark-mode' : ''}`} onClick={onClose}>
      <div className={`modal-content ${isDarkMode ? 'dark-mode' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className={`close-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={onClose}>
          &times;
        </button>
        <h3 className={isDarkMode ? 'dark-mode' : ''}>Comments ({comments.length})</h3>
        <div className={`modal-comments ${isDarkMode ? 'dark-mode' : ''}`}>
          {comments.map((comment, index) => (
            <div key={index} className={`comment ${isDarkMode ? 'dark-mode' : ''}`}>
              <span className="comment-user">{comment.user}:</span>
              <span className="comment-text">{comment.text}</span>
              <span className={`timestamp ${isDarkMode ? 'dark-mode' : ''}`}>
                {new Date(comment.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className={`comment-form ${isDarkMode ? 'dark-mode' : ''}`}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className={`comment-input ${isDarkMode ? 'dark-mode' : ''}`}
          />
          <button type="submit" className={`comment-button ${isDarkMode ? 'dark-mode' : ''}`}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;