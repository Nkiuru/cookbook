const List = require('../../../models/list');

const getList = async (_, { id }) => {
  return List.findById(id).populate('owner tags categories recipes followers');
};

const getLists = async (_, { searchTerm }) => {
  console.log(searchTerm);
  const query = searchTerm ? { $text: { $search: searchTerm } } : {};
  return List.find(query).populate('owner tags categories recipes followers');
};

const getMyLists = async (_, args, { user }) => {
  return List.find({ owner: user._id })
    .populate([
      {
        path: 'recipes',
        model: 'recipe',
        match: { isDeleted: false },
        populate: [
          {
            path: 'images.file',
            model: 'file',
          },
          {
            path: 'author',
          },
          {
            path: 'tags',
          },
        ],
      },
      {
        path: 'owner tags categories followers',
      },
    ])
    .exec();
};

const getUsersLists = async (_, { userId }) => {
  return List.find({ owner: userId })
    .populate([
      {
        path: 'recipes',
        model: 'recipe',
        match: { isDeleted: false },
        populate: [
          {
            path: 'images.file',
            model: 'file',
          },
          {
            path: 'author',
          },
          {
            path: 'tags',
          },
        ],
      },
      {
        path: 'owner tags categories followers',
      },
    ])
    .exec();
};

module.exports = {
  getList,
  getLists,
  getMyLists,
  getUsersLists,
};
