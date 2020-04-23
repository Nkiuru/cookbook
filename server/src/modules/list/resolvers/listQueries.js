const List = require('../../../models/list');

const getList = async (_, { id }) => {
  return List.findById(id).populate('owner tags categories recipes followers');
};

const getLists = async (_, { searchTerm }) => {
  console.log(searchTerm);
  const query = searchTerm ? { $text: { $search: searchTerm } } : {};
  return List.find(query).populate('owner tags categories recipes followers');
};

module.exports = {
  getList,
  getLists,
};
