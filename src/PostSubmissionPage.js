import React from 'react';
import PostForm from './PostForm';
import './PostSubmissionPage.css';

function PostSubmissionPage({ fetchPosts }) {
  return (
    <div className="post-submission-page">
      <h1>Upload a Post</h1>
      <PostForm fetchPosts={fetchPosts} />
    </div>
  );
}

export default PostSubmissionPage;