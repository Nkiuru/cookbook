const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    enum: ['mass', 'volume', 'distance'],
    required: true,
  },
  metric: {
    type: Boolean,
    required: true,
  },
  factor: {
    type: Number,
    default: 1,
  },
});

const Unit = mongoose.model('unit', unitSchema);

module.exports = Unit;
