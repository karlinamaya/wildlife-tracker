import React from 'react';
import './Gallery.css';

function Gallery({ posts }) {
  return (
    <div>
      <h1 className="gallery-title">Post Gallery</h1>
      <div className="gallery-container">
        {posts.map((post, index) => (
          <div key={index} className="gallery-item">
            {/* Left Side (White Box with Title and Description) */}
            <div className="text-content">
              <div className="white-box">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            </div>
            {/* Right Side (Image) */}
            {post.imageUrl && (
              <img 
                src={`http://localhost:5000${post.imageUrl}`} 
                alt="Post" 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
