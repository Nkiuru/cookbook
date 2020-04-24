const Recipe = require('../../../models/recipe');

const populateRecipe = async recipe => {
  return recipe.populate('rating originalAuthor author reviews categories lists images.file instructions.image');
};

const getRecipe = async (_, args) => {
  return Recipe.findById(args.id);
};

const getRecipes = async (_, args) => {
  const query = {};
  return populateRecipe(Recipe.find(query));
};

module.exports = {
  getRecipe,
  getRecipes,
};
