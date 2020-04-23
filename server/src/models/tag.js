const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  recipes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'recipe',
    },
  ],
});

const Tag = mongoose.model('tag', tagSchema);

module.exports = Tag;
