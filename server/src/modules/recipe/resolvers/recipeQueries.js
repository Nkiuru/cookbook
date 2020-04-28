const Recipe = require('../../../models/recipe');

const populateRecipe = async recipe => {
  return recipe.populate('rating originalAuthor author reviews categories tags lists images.file instructions.image');
};

const getRecipe = async (_, args) => {
  return Recipe.findById(args.id);
};

const getRecipes = async (_, args) => {
  const params = {};
  const skip = args.startPoint || 0;
  const limit = skip + 50;

  console.log(await Recipe.listIndexes());
  if (args.tags && args.tags.length > 0) {
    params.tags = {
      $elemMatch: { $in: args.tags },
    };
  }
  if (args.categories && args.categories.length > 0) {
    params.categories = {
      $elemMatch: { $in: args.categories },
    };
  }
  if (args.list) {
    params.lists = {
      $elemMatch: args.list,
    };
  }
  if (args.searchTerm) {
    params.$text = {
      $search: args.searchTerm,
    };
  }
  if (args.showDeleted) {
    return populateRecipe(
      await Recipe.find(params)
        .skip(skip)
        .limit(limit),
    );
  } else {
    return populateRecipe(Recipe.find(params));
  }
};

module.exports = {
  getRecipe,
  getRecipes,
};
