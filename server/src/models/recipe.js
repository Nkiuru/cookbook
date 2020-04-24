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
        name: {
          type: String,
          required: true,
        },
        image: {
          type: mongoose.Types.ObjectId,
          ref: 'file',
        },
      },
    },
  ],
  ingredients: [
    {
      amount: {
        type: String,
        required: true,
      },
      ingredient: {
        type: String,
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
        type: mongoose.Types.ObjectId,
        ref: 'file',
      },
    },
  ],
  images: [
    {
      image: {
        type: mongoose.Types.ObjectId,
        ref: 'file',
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
    required: true,
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
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'category',
    },
  ],
  lists: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'list',
    },
  ],
  notes: {
    type: String,
  },
});

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;
