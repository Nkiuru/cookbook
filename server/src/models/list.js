const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'tag',
    },
  ],
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'category',
    },
  ],
  recipes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'recipe',
    },
  ],
  followers: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
});

listSchema.index({ name: 'text' });
const List = mongoose.model('list', listSchema);

module.exports = List;
