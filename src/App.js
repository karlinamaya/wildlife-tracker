import React, { useState, useEffect } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import MyMap from './Map';

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
    <div className="App">
      <h1>Upload a Post</h1>
      <PostForm fetchPosts={fetchPosts} />
      <h2>Posts</h2>
      <PostList posts={posts} />
      <h2>Map</h2>
      <MyMap posts={posts} /> {/* Pass posts to the map */}
    </div>
  );
}

export default App;
