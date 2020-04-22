const List = require('../../../models/list');

const getList = async (_, { id }) => {
  return await List.findById(id);
};

const getLists = async (_, { searchTerm }) => {
  console.log(searchTerm);
  const query = searchTerm ? { $text: { $search: searchTerm } } : {};
  return await List.find(query);
};

module.exports = {
  getList,
  getLists,
};
