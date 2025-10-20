const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cloudinaryId: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  filter: {
    type: String,
    default: 'none'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Photo', photoSchema);