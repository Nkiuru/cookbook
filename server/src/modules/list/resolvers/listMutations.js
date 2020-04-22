const List = require('../../../models/list');
const Recipe = require('../../../models/recipe');
const Tag = require('../../../models/tag');
const Category = require('../../../models/category');

const createList = async (_, args, { user }) => {
  args.owner = user.id;
  let list = await List.create(args);
  return await list.populate('owner tags categories recipes followers').execPopulate();
};

const modifyList = async (_, args) => {
  console.log(args);
  const list = await List.findByIdAndUpdate(args.id, args, { new: true });
  return await list.populate('owner tags categories recipes followers').execPopulate();
};

const deleteList = async (_, args) => {
  const list = await List.findByIdAndDelete(args.id);
  //TODO: Delete list refs from recipe & user
  return `${list.name} deleted`;
};

const addRecipeToList = async (_, { id, recipe }) => {
  const r = Recipe.findOne(recipe);
  const list = await List.findByIdAndUpdate(id, { $push: { recipes: recipe } });
  return {
    success: list && r,
    message: 'Tag added',
    list: r ? await list.populate('owner tags categories recipes followers').execPopulate() : null,
  };
};

const addTagToList = async (_, { id, tag }) => {
  const t = Tag.findOne(tag);
  const list = await List.findByIdAndUpdate(id, { $push: { tags: tag } });
  return {
    success: list && t,
    message: 'Tag added',
    list: t ? await list.populate('owner tags categories recipes followers').execPopulate() : null,
  };
};

const addCategoryToList = async (_, { id, category }) => {
  const c = Category.findOne(category);
  const list = await List.findByIdAndUpdate(id, { $push: { categories: category } });
  return {
    success: list && c,
    message: 'Category added',
    list: c ? await list.populate('owner tags categories recipes followers').execPopulate() : null,
  };
};

module.exports = {
  createList,
  modifyList,
  deleteList,
  addRecipeToList,
  addTagToList,
  addCategoryToList,
};
