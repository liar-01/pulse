import React, { useState } from 'react';
import { users, posts } from '../data';
import '../styles/search-page.css';
import '../styles/styles.css';
import '../styles/dark-mode.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResults = [
    ...users.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    ...posts.filter(post => 
      post.caption.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ];

  return (
    <div className="search-page">
      <div className="search-container">
        <img 
          src="/icons/search-black.png" 
          alt="Search" 
          className="search-icon" 
        />
        <input
          type="text"
          placeholder="Search users or posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="search-results">
        {filteredResults.map(item => (
          item.username ? (
            <div key={item.id} className="user-result">
              <img 
                src={item.avatar} 
                alt={item.username} 
                className="user-avatar" 
              />
              <div className="user-info">
                <p className="username">{item.username}</p>
                <p className="name">{item.name}</p>
              </div>
            </div>
          ) : (
            <div key={item.id} className="post-result">
              <img 
                src={item.image} 
                alt="Post" 
                className="post-thumbnail" 
              />
              <p className="post-caption">{item.caption}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default SearchPage;