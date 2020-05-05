const User = require('../../../models/user');

const getUser = async (_, args) => {
  return User.findById(args.id);
};

const getUsers = async (_, args) => {
  return User.find({ $text: { $search: args.searchTerm } });
};

module.exports = {
  getUser,
  getUsers,
};
