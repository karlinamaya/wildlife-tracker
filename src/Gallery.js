import React from 'react';
import PostList from './PostList';

function Gallery({ posts }) {
  return (
    <div>
      <h1>Gallery</h1>
      <PostList posts={posts} />
    </div>
  );
}

export default Gallery;