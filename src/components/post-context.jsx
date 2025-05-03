import { createContext, useContext, useState } from 'react';
import { users } from '../data/users';
import { posts as initialPosts } from '../data/posts';

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(initialPosts);
  
  const addComment = (postId, comment) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));
  };

  const toggleLike = (postId, isLiked) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: isLiked ? (post.likes || 0) + 1 : Math.max(0, (post.likes || 0) - 1),
            isLiked: isLiked
          } 
        : post
    ));
  };

  return (
    <PostsContext.Provider value={{ posts, users, addComment, toggleLike }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);