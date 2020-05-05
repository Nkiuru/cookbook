const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  recipe: {
    type: mongoose.Types.ObjectId,
    ref: 'recipe',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;
