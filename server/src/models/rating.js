const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
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
  score: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
});

const Rating = mongoose.model('rating', ratingSchema);

module.exports = Rating;
