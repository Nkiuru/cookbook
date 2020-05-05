const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    text: true,
  },
  lastName: {
    type: String,
    required: true,
    text: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  changed: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
  },
  lists: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'list',
    },
  ],
  followedLists: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'list',
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

userSchema.index({ firstName: 'text', lastName: 'text' });
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model('user', userSchema);

module.exports = User;
