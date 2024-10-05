import React from 'react';
import PostForm from './PostForm';

function PostSubmissionPage({ fetchPosts }) {
  return (
    <div>
      <h1>Upload a Post</h1>
      <PostForm fetchPosts={fetchPosts} />
    </div>
  );
}

export default PostSubmissionPage;