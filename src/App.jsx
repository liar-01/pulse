import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page';
import ProfilePage from './pages/profile-page';
import SearchPage from './pages/search-page';
import AddPostPage from './pages/add-post-page';
import MessagesPage from './pages/messages-page';
import PostPage from './pages/post-page';
import { PostsProvider } from './components/post-context';
import Navbar from './components/navbar';
import Header from './components/header';
import './styles/styles.css';

function App() {
  return (
    <PostsProvider>
      <Router>
        <div className="app-container">
          <Header />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/add-post" element={<AddPostPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/post/:postId" element={<PostPage />} />
              <Route path="/post/:postId" element={<PostPage />} />
            </Routes>
          </main>

          <Navbar />
        </div>
      </Router>
    </PostsProvider>
  );
}

export default App;