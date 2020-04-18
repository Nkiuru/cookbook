const mongoose = require('mongoose');
const difficulty = require('./difficulty');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 120,
  },
  description: {
    type: String,
    required: true,
  },
  equipment: [
    {
      amount: {
        type: Number,
        min: 0,
        required: true,
      },
      tool: {
        type: mongoose.Types.ObjectId,
        ref: 'tool',
        required: true,
      },
    },
  ],
  ingredients: [
    {
      amount: {
        type: Number,
        min: 0,
        required: true,
      },
      unit: {
        type: mongoose.Types.ObjectId,
        ref: 'unit',
        required: true,
      },
      ingredient: {
        type: mongoose.Types.ObjectId,
        ref: 'ingredient',
        required: true,
      },
    },
  ],
  instructions: [
    {
      step: {
        type: Number,
        min: 0,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
    },
  ],
  images: [
    {
      image: {
        type: String,
        required: true,
      },
      primary: {
        type: Boolean,
        default: false,
      },
      altText: {
        type: String,
        maxlength: 300,
      },
    },
  ],
  calories: {
    type: Number,
    min: 0,
    required: true,
  },
  cookingTime: {
    type: String,
    required: true,
  },
  rating: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'rating',
    },
  ],
  difficulty: {
    type: String,
    enum: Object.keys(difficulty),
  },
  portions: {
    type: Number,
    min: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  changed: {
    type: Date,
    default: Date.now,
  },
  originalAuthor: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  tags: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'tag',
    },
  ],
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'review',
    },
  ],
});

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;
