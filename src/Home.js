import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyMap from './Map';
import './Home.css'; // Import the CSS file for Home component

function Home({ posts }) {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <div className="home-container">
      <div className="home-left">
        <h1>Knights' Wildlife Tracker</h1>
        <p>Hello!</p>
        <button onClick={handleUploadClick}>Upload a Post</button>
      </div>
      <div className="home-right">
        <h2>Map</h2>
        <MyMap posts={posts} /> {/* Pass posts to the map */}
      </div>
    </div>
  );
}

export default Home;