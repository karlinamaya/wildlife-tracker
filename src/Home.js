import { useNavigate } from 'react-router-dom';
import MyMap from './Map';
import './Home.css';
import React, { useEffect } from 'react';


function Home({ posts }) {
  useEffect(() => {
    console.log(posts);
  }, [posts]);


  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <div className="home-container">
      <div className="home-left">
        <h1>Knights' Wildlife Tracker</h1>
        <p>Discover and share wildlife sightings across UCF's campus! Explore the interactive map, upload photos of animals you've spotted, 
          and join a community of nature lovers tracking the biodiversity that makes UCF unique.</p>
        <button onClick={handleUploadClick}>Submit a post</button>
      </div>
      <div className="home-right">
        <MyMap posts={posts} /> {/* Pass posts to the map */}
      </div>
    </div>
  );
}

export default Home;