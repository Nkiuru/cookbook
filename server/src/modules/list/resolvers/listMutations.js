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

const modifyList = async (_, args, { user }) => {
  let l = await List.findById(args.id);
  if (!l) {
    throw new ApolloError('List does not exist');
  }
  if (l.owner.toString() !== user._id.toString()) {
    throw new ApolloError('Unauthorized');
  }
  const list = await List.findByIdAndUpdate(args.id, args, { new: true });
  return await list.populate('owner tags categories recipes followers').execPopulate();
};

const deleteList = async (_, args, { user }) => {
  let l = await List.findById(args.id);
  if (!l) {
    throw new ApolloError('List does not exist');
  }
  if (l.owner.toString() !== user._id.toString()) {
    throw new ApolloError('Unauthorized');
  }
  const list = await List.findByIdAndDelete(args.id);
  //TODO: Delete list refs from recipe & user
  return `${list.name} deleted`;
};

const addRecipeToList = async (_, { id, recipe }, { user }) => {
  const r = Recipe.findOne(recipe);
  if (r && r.owner.toString() === user.id.toString()) {
    const list = await List.findByIdAndUpdate(id, { $push: { recipes: recipe } });
    r.lists.push(list.id);
    await r.save();
    return await list.populate('owner tags categories recipes followers').execPopulate();
  } else {
    throw new ApolloError('Recipe does not exist / Unauthorized');
  }
};

const addTagToList = async (_, { id, tag }, { user }) => {
  const t = Tag.findOne(tag);
  if (t && t.owner.toString() === user.id.toString()) {
    const list = await List.findByIdAndUpdate(id, { $push: { tags: tag } });
    return await list.populate('owner tags categories recipes followers').execPopulate();
  } else {
    throw new ApolloError('Tag does not exist / Unauthorized');
  }
};

const addCategoryToList = async (_, { id, category }, { user }) => {
  const c = Category.findOne(category);
  if (c && c.owner.toString() === user.id.toString()) {
    const list = await List.findByIdAndUpdate(id, { $push: { categories: category } });
    return await list.populate('owner tags categories recipes followers').execPopulate();
  } else {
    throw new ApolloError('Category does not exist / Unauthorized');
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
