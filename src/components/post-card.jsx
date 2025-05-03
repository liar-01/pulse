import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import LikeButton from './like-button';
import CommentSection from './comment-section';
import '../styles/post-card.css';

const PostCard = ({ post, fullView, onViewComments }) => {
  return (
    <div className="post-card">
      <img src={post.image} alt="Post" className="post-image" />
      <div className="post-content">
        <p className="caption">{post.caption}</p>
        
        <div className="interaction-buttons">
          <LikeButton postId={post.id} initialLikes={post.likes} />
          <span className="comment-count">
            💬 {post.comments.length} comments
          </span>
        </div>

        {post.comments.length > 0 && (
          <div className="comment-previews">
            {post.comments.slice(0, 2).map((comment) => (
              <div key={comment.id} className="comment-preview">
                <span className="comment-user">{comment.user}:</span>
                <span className="comment-text">{comment.text}</span>
              </div>
            ))}
          </div>
        )}

        <div className="post-footer">
          <button 
            onClick={() => onViewComments(post.id)} 
            className="view-comments-button"
          >
            View all {post.comments.length} comments
          </button>
          <span className="timestamp">
            {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
          </span>
        </div>

        <CommentSection 
          postId={post.id}
          onCommentAdded={() => {
            onViewComments(post.id); // Refresh comments sidebar
          }}
        />
      </div>
    </div>
  );
};

export default PostCard;