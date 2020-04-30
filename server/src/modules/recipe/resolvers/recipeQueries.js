const Recipe = require('../../../models/recipe');

const populateRecipe = async (recipe, skip, limit) => {
  return Recipe.populateRecipe(recipe)
    .skip(skip)
    .limit(limit);
};

const getRecipe = async (_, args) => {
  return Recipe.findById(args.id);
};

const getRecipes = async (_, args) => {
  const params = {};
  const skip = args.startPoint || 0;
  const limit = skip + 50;

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
      $in: args.list,
    };
  }
  if (args.searchTerm) {
    params.$text = {
      $search: args.searchTerm,
    };
  }
  if (args.difficulty) params.difficulty = args.difficulty;
  if (args.author) params.author = args.author;
  if (args.ingredients) {
    params.ingredients = {
      $elemMatch: { _id: { $in: args.ingredients } },
    };
  }
  if (args.rating) {
    params.$expr = { $gte: [{ $avg: '$ratings.score' }, args.rating] };
  }
  console.log(params);
  if (args.showDeleted) {
    return populateRecipe(Recipe.find(params), skip, limit);
  } else {
    return populateRecipe(Recipe.findRecipes(params), skip, limit);
  }
};

module.exports = {
  getRecipe,
  getRecipes,
};
