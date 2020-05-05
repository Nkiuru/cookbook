const List = require('../../../models/list');
const Recipe = require('../../../models/recipe');
const Tag = require('../../../models/tag');
const Category = require('../../../models/category');
const { ApolloError } = require('apollo-server-express');
const createList = async (_, args, { user }) => {
  args.owner = user.id;
  let list = await List.create(args);
  if (list.recipes) {
    for await (const recipe of list.recipes) {
      const r = await Recipe.findById(recipe);
      if (!r.lists) {
        r.lists = [];
      }
      r.lists.push(list.id);
      await r.save();
    }
  }
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
  for await (const recipe of l.recipes) {
    if (args.recipes && !args.recipes.find(r => r === recipe)) {
      await Recipe.findByIdAndUpdate(recipe, {
        $pull: { lists: l.id },
      });
    }
  }
  const list = await List.findByIdAndUpdate(args.id, args, { new: true });
  if (args.recipes) {
    for await (const recipe of args.recipes) {
      const r = await Recipe.findById(recipe);
      if (!r.lists) {
        r.lists = [];
      }
      r.lists.push(list.id);
      await r.save();
    }
  }
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
  for await (const recipe of list.recipes) {
    await Recipe.findByIdAndUpdate(recipe, {
      $pull: { lists: list.id },
    });
  }
  return `${list.name} deleted`;
};

const addRecipeToList = async (_, { id, recipe }, { user }) => {
  const r = await Recipe.findById(recipe);
  let list = await List.findById(id);
  if (r && list.owner.toString() === user.id.toString()) {
    list = await List.findByIdAndUpdate(id, { $addToSet: { recipes: recipe } });
    r.lists.push(list.id);
    await r.save();
    return await list.populate('owner tags categories recipes followers').execPopulate();
  } else {
    throw new ApolloError('Recipe does not exist / Unauthorized');
  }
};

const addTagToList = async (_, { id, tag }, { user }) => {
  const t = await Tag.findById(tag);
  let list = await List.findById(id);
  if (t && list.owner.toString() === user.id.toString()) {
    list = await List.findByIdAndUpdate(id, { $addToSet: { tags: tag } });
    return await list.populate('owner tags categories recipes followers').execPopulate();
  } else {
    throw new ApolloError('Category does not exist / Unauthorized');
  }
};

const addCategoryToList = async (_, { id, category }, { user }) => {
  const c = Category.findOne(category);
  let list = await List.findById(id);
  if (c && list.owner.toString() === user.id.toString()) {
    list = await List.findByIdAndUpdate(id, { $addToSet: { categories: category } });
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
