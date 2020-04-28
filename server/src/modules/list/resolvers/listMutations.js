const List = require('../../../models/list');
const Recipe = require('../../../models/recipe');
const Tag = require('../../../models/tag');
const Category = require('../../../models/category');
const { ApolloError } = require('apollo-server-express');

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
  if (r) {
    const list = await List.findByIdAndUpdate(id, { $push: { recipes: recipe } });
    r.lists.push(list.id);
    await r.save();
    return await list.populate('owner tags categories recipes followers').execPopulate();
  } else {
    throw new ApolloError('Recipe does not exist');
  }
};

const addTagToList = async (_, { id, tag }) => {
  const t = Tag.findOne(tag);
  if (t) {
    const list = await List.findByIdAndUpdate(id, { $push: { tags: tag } });
    return await list.populate('owner tags categories recipes followers').execPopulate();
  } else {
    throw new ApolloError('Tag does not exist');
  }
};

const addCategoryToList = async (_, { id, category }) => {
  const c = Category.findOne(category);
  if (c) {
    const list = await List.findByIdAndUpdate(id, { $push: { categories: category } });
    return await list.populate('owner tags categories recipes followers').execPopulate();
  } else {
    throw new ApolloError('Category does not exist');
  }
};

module.exports = {
  createList,
  modifyList,
  deleteList,
  addRecipeToList,
  addTagToList,
  addCategoryToList,
};
