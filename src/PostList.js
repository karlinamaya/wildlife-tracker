import { useEffect, useState } from 'react';

function PostList() {
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
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {/* if there is image url, display image */}
          {post.imageUrl && (
            <img 
              src={`http://localhost:5000${post.imageUrl}`} 
              alt="Post" 
              style={{ maxWidth: '300px', height: 'auto' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;