const { UserInputError } = require('apollo-server-express');
const User = require('../../../models/user');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

const signup = async (_, { email, password, firstName, lastName }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new UserInputError('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  return {
    ...user._doc,
    id: user.id,
  };
};

module.exports = signup;