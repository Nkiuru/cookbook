const Ingredient = require('../../../models/ingredient');
const Recipe = require('../../../models/recipe');

const createIngredient = async (_, args) => {
  console.log(args);
  return Ingredient.create(args);
};

const modifyIngredient = async (_, args) => {
  console.log(args);
  return await Ingredient.findByIdAndUpdate(args.id, args, { new: true });
};

const deleteIngredient = async (_, args) => {
  const usedInRecipe = Recipe.find({ 'ingredients.ingredient': { $in: [args.id] } }).length > 0;
  if (usedInRecipe) {
    throw `Used in recipes, ${args.id} cannot be deleted`;
  } else {
    const ingredient = await Ingredient.findByIdAndDelete(args.id);
    return `${ingredient.name} deleted`;
  }
};

module.exports = {
  createIngredient,
  modifyIngredient,
  deleteIngredient,
};
