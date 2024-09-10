// index.js
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const Pin = require('./models/pin')
const dotenv = require('dotenv');

const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Add a pin
app.post('/pins', async (req, res) => {
  try {
    const { location, caption, photoUrl } = req.body;
    console.log(req.body);
    const newPin = new Pin({ location, caption, photoUrl });
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
