import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostSubmissionPage from './PostSubmissionPage';
import Gallery from './Gallery';
import Home from './Home'; // Import Home component

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
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home posts={posts} fetchPosts={fetchPosts} />} />
          <Route path="/gallery" element={<Gallery posts={posts} />} />
          <Route path="/upload" element={<PostSubmissionPage fetchPosts={fetchPosts} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;