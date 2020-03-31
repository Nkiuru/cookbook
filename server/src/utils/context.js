const tokenUtil = require('./token.js');
const User = require('../models/user');

const TOKEN_HEADER_NAME = 'authorization';

const getUser = async req => {
  if (!req) {
    return null;
  }
  const tokenHeader = req.get(TOKEN_HEADER_NAME);
  const token = tokenHeader.split(' ')[1];
  if (!token) {
    return null;
  }

  try {
    const decodedToken = await tokenUtil.getDecodedToken(token);
    const user = await User.findById(decodedToken.userId);
    return user;
  } catch (e) {
    return null;
  }
};

module.exports = { getUser };
