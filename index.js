// index.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mapdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check for MongoDB connection success
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
