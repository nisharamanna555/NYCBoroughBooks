const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number, Number],
  },
  caption: String,
  // photoUrl: String,
});

const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;
