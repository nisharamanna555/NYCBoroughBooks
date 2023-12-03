// index.js
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const Pin = require('./models/pin')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/beanbutter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check for MongoDB connection success
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Add a pin
app.post('/pins', async (req, res) => {
  try {
    const { location, caption, photoUrl } = req.body;
    console.log(req.body);
    const newPin = new Pin({ location, caption, photoUrl });
    console.log("Nisha look", newPin)
    await newPin.save();
    res.status(201).json(newPin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all pins
app.get('/pins', async (req, res) => {
  try {
    const pins = await Pin.find();
    res.json(pins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
