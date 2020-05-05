const Recipe = require('../../../models/recipe');
const Unit = require('../../../models/unit');

const createUnit = async (_, args) => {
  console.log(args);
  return Unit.create(args);
};

const modifyUnit = async (_, args) => {
  console.log(args);
  return await Unit.findByIdAndUpdate(args.id, args, { new: true });
};

const deleteUnit = async (_, args) => {
  const usedInRecipe = Recipe.find({ 'ingredients.unit': { $in: [args.id] } }).length > 0;
  if (usedInRecipe) {
    throw `Used in recipes, ${args.id} cannot be deleted`;
  } else {
    const ingredient = await Unit.findByIdAndDelete(args.id);
    return `${ingredient.name} deleted`;
  }
};

module.exports = {
  createUnit,
  modifyUnit,
  deleteUnit,
};
