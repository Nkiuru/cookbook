const Recipe = require('../../../models/recipe');
const File = require('../../../models/file');
const { processUpload } = require('../../../utils/upload');
const mongoose = require('mongoose');

const populateRecipe = async recipe => {
  return recipe
    .populate('rating originalAuthor author reviews categories lists images.file instructions.image')
    .execPopulate();
};

const createRecipe = async (_, args, { user }) => {
  args = args.recipe;
  args.author = user.id;
  args.originalAuthor = user.id;
  const files = args.images;
  args.images = [];
  for await (const image of files) {
    const upload = await processUpload(image.file);
    const file = await File.create(upload);
    image.file = file.id;
    args.images.push(image);
  }
  const instructions = args.instructions;
  args.instructions = [];
  for await (const instruction of instructions) {
    const upload = await processUpload(instruction.image);
    const file = await File.create(upload);
    instruction.image = file.id;
    args.instructions.push(instruction);
  }
  return await populateRecipe(await Recipe.create(args));
};

const modifyRecipe = async (_, args) => {};
const deleteRecipe = async (_, args) => {};
const cloneRecipe = async (_, { id }, { user }) => {
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw 'Recipe does not exist';
  }
  recipe._doc._id = mongoose.Types.ObjectId();
  recipe.author = user.id;
  recipe.isNew = true;
  recipe.save();
  return populateRecipe(recipe);
};

module.exports = {
  createRecipe,
  modifyRecipe,
  deleteRecipe,
  cloneRecipe,
};
