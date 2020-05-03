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
    .populate({
      path: 'owner tags categories recipes followers',
      populate: [
        {
          path: 'images.file',
          model: 'file',
        },
        {
          path: 'author',
        },
      ],
    })
    .exec();
};

module.exports = {
  getList,
  getLists,
  getMyLists,
};
