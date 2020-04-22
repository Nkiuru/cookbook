const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  recipes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'recipe',
    },
  ],
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
