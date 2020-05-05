const Recipe = require('../../../models/recipe');
const File = require('../../../models/file');
const { processUpload } = require('../../../utils/upload');
const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server-express');
const lodash = require('lodash');

const populateRecipe = async recipe => {
  return Recipe.populateRecipe(recipe).execPopulate();
};

const createFiles = async recipe => {
  const files = recipe.images;
  recipe.images = [];
  for await (const image of files) {
    if (!image.file._id) {
      const upload = await processUpload(image.file);
      const file = await File.create(upload);
      image.file = file.id;
      recipe.images.push(image);
    } else {
      recipe.images.push(image);
    }
  }
  const instructions = recipe.instructions;
  recipe.instructions = [];
  for await (const instruction of instructions) {
    if (!instruction.image._id) {
      const upload = await processUpload(instruction.image);
      const file = await File.create(upload);
      instruction.image = file.id;
      recipe.instructions.push(instruction);
    } else {
      recipe.instructions.push(instruction);
    }
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
  args = args.recipe;
  let recipe = await Recipe.findById(args.id);
  if (!recipe) {
    throw new ApolloError('Recipe does not exist');
  }
  if (recipe.author.toString() !== user._id.toString()) {
    throw new ApolloError('Unauthorized');
  }
  let newRecipe = args;
  console.log(newRecipe);
  if ((args.images && args.images.length > 0) || (args.instructions && args.instructions.length > 0)) {
    newRecipe = await createFiles(args);
  }
  recipe = Object.assign(recipe, newRecipe);
  await recipe.save();
  console.log(recipe);
  return await populateRecipe(recipe);
};

const deleteRecipe = async (_, args) => {
  let recipe = await Recipe.findById(args.id);
  if (!recipe) {
    throw new ApolloError('Recipe does not exist');
  }
  recipe.isDeleted = true;
  await recipe.save();
  return 'Recipe deleted';
};

const cloneRecipe = async (_, { id }, { user }) => {
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw new ApolloError('Recipe does not exist');
  }
  recipe._doc._id = mongoose.Types.ObjectId();
  recipe.author = user.id;
  recipe.updatedAt = Date.now();
  recipe.isNew = true;
  recipe.save();
  return populateRecipe(recipe);
};

const rateRecipe = async (_, { recipe: { id, score } }, { user }) => {
  let recipe = await Recipe.findById(id);
  if (!recipe) throw new ApolloError('Recipe not found');
  if (score < 1 && score > 5) {
    throw new ApolloError('Rating has to be in range 1-5');
  }
  await Recipe.findByIdAndUpdate(id, { $pull: { ratings: { user: user._id.toString() } } });
  return populateRecipe(
    await Recipe.findByIdAndUpdate(
      id,
      {
        $addToSet: { ratings: { user: user._id, score: score } },
      },
      { new: true },
    ),
  );
};

module.exports = {
  createRecipe,
  modifyRecipe,
  deleteRecipe,
  cloneRecipe,
  rateRecipe,
};
