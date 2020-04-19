const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Tool = mongoose.model('tool', toolSchema);

module.exports = Tool;
