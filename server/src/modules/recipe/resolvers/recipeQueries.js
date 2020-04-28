const Recipe = require('../../../models/recipe');

const populateRecipe = async recipe => {
  return recipe.populate('rating originalAuthor author reviews categories tags lists images.file instructions.image');
};

const getRecipe = async (_, args) => {
  return Recipe.findById(args.id);
};

const getRecipes = async (_, args) => {
  const params = {};
  const query = args.showDeleted ? Recipe.find(params) : Recipe.findRecipes(params);
  return populateRecipe(await query.exec());
};

module.exports = {
  getRecipe,
  getRecipes,
};
