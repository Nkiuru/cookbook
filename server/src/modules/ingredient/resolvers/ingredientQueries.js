const Ingredient = require('../../../models/ingredient');

const getIngredient = async (_, { id }) => {
  return await Ingredient.findById(id);
};

const getIngredients = async (_, { searchTerm }) => {
  console.log(searchTerm);
  const query = searchTerm ? { $text: { $search: searchTerm } } : {};
  return await Ingredient.find(query);
};

module.exports = {
  getIngredient,
  getIngredients,
};
