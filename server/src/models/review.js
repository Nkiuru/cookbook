const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  recipeId: {
    type: mongoose.Types.ObjectId,
    ref: 'recipe',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;
