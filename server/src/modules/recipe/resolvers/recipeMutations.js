const Recipe = require('../../../models/recipe');
const File = require('../../../models/file');
const { processUpload } = require('../../../utils/upload');

const populateRecipe = async recipe => {
  return recipe.populate('rating originalAuthor author reviews categories lists images.image');
};

const createRecipe = async (_, args, { user }) => {
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
  console.log(args);
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
