const Recipe = require('../../../models/recipe');
const File = require('../../../models/file');
const { processUpload } = require('../../../utils/upload');
const mongoose = require('mongoose');
const { merge } = require('lodash-es');

const populateRecipe = async recipe => {
  return recipe
    .populate('rating originalAuthor author reviews categories lists images.file instructions.image')
    .execPopulate();
};

const createFiles = async recipe => {
  const files = recipe.images;
  recipe.images = [];
  for await (const image of files) {
    const upload = await processUpload(image.file);
    const file = await File.create(upload);
    image.file = file.id;
    recipe.images.push(image);
  }
  const instructions = recipe.instructions;
  recipe.instructions = [];
  for await (const instruction of instructions) {
    const upload = await processUpload(instruction.image);
    const file = await File.create(upload);
    instruction.image = file.id;
    recipe.instructions.push(instruction);
  }
  return recipe;
};

const createRecipe = async (_, args, { user }) => {
  args = args.recipe;
  args.author = user.id;
  args.originalAuthor = user.id;
  args = await createFiles(args);
  return await populateRecipe(await Recipe.create(args));
};

const modifyRecipe = async (_, args, { user }) => {
  let recipe = await Recipe.findById(args.id);
  if (recipe.owner !== user.id) {
    throw 'Unauthorized';
  }
  let newRecipe = args;
  if ((args.images && args.images.length > 0) || (args.instructions && args.instructions.length > 0)) {
    newRecipe = await createFiles(args);
  }
  recipe = merge(newRecipe, recipe);
  await recipe.save();
  return await populateRecipe(recipe);
};

const deleteRecipe = async (_, args) => {};
const cloneRecipe = async (_, { id }, { user }) => {
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw 'Recipe does not exist';
  }
  recipe._doc._id = mongoose.Types.ObjectId();
  recipe.author = user.id;
  recipe.updatedAt = Date.now();
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
