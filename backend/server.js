const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Initialize Express
const app = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// Static folder to serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://karlimaya:evKuGQT@wildlife-data.fpng3.mongodb.net/?retryWrites=true&w=majority&appName=wildlife-data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Post schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String,
  latitude: Number,  // Store latitude for the map
  longitude: Number, // Store longitude for the map
});

// Create Post model
const Post = mongoose.model('Post', postSchema);

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'uploads')); // Corrected path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save image with a unique filename
  },
});

const upload = multer({ storage: storage });

// API endpoint to get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts from MongoDB
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API endpoint to upload a new post
app.post('/api/posts', upload.single('image'), async (req, res) => {
  try {
    const { title, content, latitude, longitude } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new Post({
      title,
      content,
      imageUrl,
      latitude: parseFloat(latitude),  // Convert latitude to number
      longitude: parseFloat(longitude), // Convert longitude to number
    });

    await newPost.save(); // Save post in MongoDB
    res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create post', error: err });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});