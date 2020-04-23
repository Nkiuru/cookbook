const Recipe = require('../../../models/recipe');

const getRecipe = async (_, args) => {
  return Recipe.findById(args.id);
};

const getRecipes = async (_, args) => {
  const query = {};

  return Recipe.find(query);
};

module.exports = {
  getRecipe,
  getRecipes,
};
