const mongoose = require('mongoose');
const difficulty = require('./difficulty');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 120,
    text: true,
  },
  description: {
    type: String,
    required: true,
    text: true,
  },
  equipment: [
    {
      amount: {
        type: String,
        min: 0,
        required: true,
      },
      name: {
        type: String,
        required: true,
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
        text: true,
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
        text: true,
      },
      image: {
        type: mongoose.Types.ObjectId,
        ref: 'file',
      },
    },
  ],
  images: [
    {
      file: {
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
  ratings: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
      },
      score: {
        type: Number,
        min: 1,
        max: 5,
      },
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

recipeSchema.index(
  { title: 'text', description: 'text', 'ingredients.ingredient': 'text', 'instructions.text': 'text' },
  { weights: { title: 5, description: 2, 'ingredients.ingredient': 2, 'instructions.text': 1 } },
);

recipeSchema.set('toObject', { getters: true });
recipeSchema.statics.findRecipes = function(query) {
  query.isDeleted = false;
  console.log(query);
  return this.find(query);
};

recipeSchema.statics.findDeletedRecipes = function(query) {
  return this.find(query, { isDeleted: true });
};

recipeSchema.statics.populateRecipe = function(recipe) {
  return recipe.populate({
    path: 'originalAuthor author reviews categories tags lists images.file instructions.image ratings.user',
    populate: [
      {
        path: 'user',
        model: 'user',
      },
    ],
  });
};

recipeSchema.virtual('rating').get(async function() {
  const avg = await Recipe.aggregate([{ $project: { averageRating: { $avg: '$ratings.score' } } }]);
  const a = avg.find(x => {
    return x._id.toString() === this._id.toString();
  });
  return a.averageRating;
});

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;
