const User = require('../../../models/user');
const { ApolloError } = require('apollo-server-express');
const bcrypt = require('bcrypt');

const updateUser = async (_, args, { user }) => {
  args = args.user;
  if (!args.id) {
    args.id = user._id;
  }
  const dbUser = await User.findById(args.id);
  if (dbUser.id.toString() !== user.id.toString()) {
    throw new ApolloError('Unauthorized');
  }
  dbUser.firstName = args.firstName || dbUser.firstName;
  dbUser.lastName = args.lastName || dbUser.lastName;
  dbUser.email = args.email || dbUser.email;
  if (args.password) {
    dbUser.password = await bcrypt.hash(args.password, 12);
  }
  return dbUser.save();
};

const deleteUser = async (_, args, { user }) => {};

const createAdmin = async (_, args) => {
  const dbUser = await User.findById(args.id);
  if (!dbUser) {
    throw new ApolloError('User not found');
  }
  console.log(dbUser);
  dbUser.isAdmin = args.isAdmin;
  return dbUser.save();
};

module.exports = {
  updateUser,
  deleteUser,
  createAdmin,
};
