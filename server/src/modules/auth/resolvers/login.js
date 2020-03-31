const { AuthenticationError } = require('apollo-server-express');
const tokenUtil = require('../../../utils/token');
const User = require('../../../models/user');
const config = require('../../../config');
const bcrypt = require('bcrypt');

const login = async (_, { email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError('Incorrect username / password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AuthenticationError('Incorrect username / password');
  }
  const token = tokenUtil.create(user.id);

  return {
    user: {
      ...user._doc,
      id: user.id,
    },
    token,
    tokenExpiration: config.JWT_LIFE_TIME,
  };
};

module.exports = login;
