const Unit = require('../../../models/unit');

const getUnit = async (_, { id }) => {
  return await Unit.findById(id);
};

const getUnits = async (_, { searchTerm }) => {
  console.log(searchTerm);
  const query = searchTerm ? { $text: { $search: searchTerm } } : {};
  return await Unit.find(query);
};

module.exports = {
  getUnit,
  getUnits,
};
