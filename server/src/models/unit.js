const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  class: {
    type: String,
    enum: ['MASS', 'VOLUME', 'DISTANCE'],
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

unitSchema.index({ name: 'text' });
const Unit = mongoose.model('unit', unitSchema);

module.exports = Unit;
