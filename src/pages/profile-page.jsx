import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { users, posts } from '../data';
import PostCard from '../components/post-card';
import '../styles/profile-page.css';
import '../styles/styles.css';
import '../styles/dark-mode.css';

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = users.find(u => u.id === Number(userId));
  const userPosts = posts.filter(post => post.userId === Number(userId));

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  if (!user) return <div className="error-message">User not found</div>;

  return (
    <div className="profile-page">
      <div className="user-info">
        <h2 className="username">{user.username}</h2>
        <img src={user.avatar} alt="Profile" className="user-avatar" />
        <p className="user-name">{user.name}</p>
        <p className="bio">{user.bio}</p>
        <div className="user-stats">
          <p>📝 {user.posts} Posts</p>
          <p>👥 {user.followers} Followers</p>
          <p>❤️ {user.following} Following</p>
        </div>
      </div>
      
      <div className="posts-grid">
        {userPosts.map(post => (
          <div 
            key={post.id} 
            className="grid-item"
            onClick={() => handlePostClick(post.id)}
          >
            <PostCard 
              post={post}
              onViewComments={() => handlePostClick(post.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;