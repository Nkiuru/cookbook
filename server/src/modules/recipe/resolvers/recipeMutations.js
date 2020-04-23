const Recipe = require('../../../models/recipe');

const populateRecipe = async recipe => {
  return recipe.populate('rating originalAuthor author reviews categories lists');
};

const createRecipe = async (_, args, { user }) => {
  args.author = user.id;
  args.originalAuthor = user.id;
  const recipe = Recipe.create(args);
  return populateRecipe(recipe);
};

const modifyRecipe = async (_, args) => {};
const deleteRecipe = async (_, args) => {};
const cloneRecipe = async (_, args, { user }) => {};

module.exports = {
  createRecipe,
  modifyRecipe,
  deleteRecipe,
  cloneRecipe,
};
