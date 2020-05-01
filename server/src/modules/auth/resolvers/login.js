const { AuthenticationError } = require('apollo-server-express');
const tokenUtil = require('../../../utils/token');
const User = require('../../../models/user');
const config = require('../../../config');
const bcrypt = require('bcrypt');

const login = async (_, { email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError('Incorrect email / password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AuthenticationError('Incorrect email / password');
  }
  const token = tokenUtil.create(user.id);
  user.lastActive = Date.now();
  await user.save();
  return {
    user: user,
    token,
    tokenExpiration: config.JWT_LIFE_TIME,
  };
};

module.exports = login;
