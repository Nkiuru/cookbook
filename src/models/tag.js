const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

tagSchema.virtual('recipes', {
  ref: 'recipe',
  localField: '_id',
  foreignField: 'tags',
});

const Tag = mongoose.model('tag', tagSchema);

module.exports = Tag;
