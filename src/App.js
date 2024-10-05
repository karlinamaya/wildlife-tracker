import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostSubmissionPage from './PostSubmissionPage';
import Gallery from './Gallery';
import Home from './Home';
import './App.css'; // Import the CSS file for App component

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
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/">Home</Link>
            </li>
            <li className="navbar-item">
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