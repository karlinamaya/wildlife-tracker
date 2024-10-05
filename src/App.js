import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostForm from './PostForm';
import PostList from './PostList';
import MyMap from './Map';
import PostSubmissionPage from './PostSubmissionPage';

function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch('http://localhost:5000/api/posts');
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>Home Page</h1>
                <Link to="/upload">
                  <button>Upload a Post</button>
                </Link>
                <h2>Posts</h2>
                <PostList posts={posts} />
                <h2>Map</h2>
                <MyMap posts={posts} /> {/* Pass posts to the map */}
              </div>
            }
          />
          <Route
            path="/upload"
            element={<PostSubmissionPage fetchPosts={fetchPosts} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;