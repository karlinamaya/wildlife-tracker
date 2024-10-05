import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyMap from './Map';

function Home({ posts }) {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleUploadClick}>Upload a Post</button>
      <h2>Map</h2>
      <MyMap posts={posts} /> {/* Pass posts to the map */}
    </div>
  );
}

export default Home;