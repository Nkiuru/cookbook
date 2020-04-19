const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  tagName: {
    type: String,
    required: true,
  },
});

const Tool = mongoose.model('tool', toolSchema);

module.exports = Tool;
