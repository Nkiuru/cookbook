const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

categorySchema.virtual('recipes', {
  ref: 'recipe',
  localField: '_id',
  foreignField: 'tags',
});
const Category = mongoose.model('category', categorySchema);

module.exports = Category;
