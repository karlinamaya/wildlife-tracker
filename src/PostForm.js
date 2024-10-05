import { useState } from 'react';

function PostForm({ fetchPosts }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Post uploaded successfully!');
        fetchPosts(); // Refresh the post list
      } else {
        alert('Failed to upload post.');
      }
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </label>
      <label>
        Upload Image:
        <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
      </label>
      <label>
        Latitude:
        <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
      </label>
      <label>
        Longitude:
        <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
      </label>
      <button type="submit">Submit Post</button>
    </form>
  );
}

export default PostForm;
