const List = require('../../../models/list');
const Recipe = require('../../../models/recipe');
const Tag = require('../../../models/tag');
const Category = require('../../../models/category');

const createList = async (_, args, { user }) => {
  args.owner = user.id;
  let list = await List.create(args);
  list = await list.populate('owner tags categories recipes followers').execPopulate();
  return list;
};

const modifyList = async (_, args) => {
  console.log(args);
  return await List.findByIdAndUpdate(args.id, args, { new: true });
};

const deleteList = async (_, args) => {
  const list = await List.findByIdAndDelete(args.id);
  //TODO: Delete list refs from recipe & user
  return `${list.name} deleted`;
};

const addRecipeToList = async (_, { id, recipe }) => {
  const r = Recipe.findOne(recipe);
  return r
    ? await List.findByIdAndUpdate(id, { $push: { recipes: recipe } })
    : { success: false, message: `Recipe does not exist` };
};

const addTagToList = async (_, { id, tag }) => {
  const t = Tag.findOne(tag);
  return t
    ? await List.findByIdAndUpdate(id, { $push: { tags: tag } })
    : { success: false, message: `Tag does not exist` };
};

const addCategoryToList = async (_, { id, category }) => {
  const c = Category.findOne(category);
  return c
    ? await List.findByIdAndUpdate(id, { $push: { categories: category } })
    : { success: false, message: `Recipe does not exist` };
};

module.exports = {
  createList,
  modifyList,
  deleteList,
  addRecipeToList,
  addTagToList,
  addCategoryToList,
};
