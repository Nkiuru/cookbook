const Tag = require('../../../models/tag');
const Recipe = require('../../../models/recipe');

const createTag = async (_, args) => {
  return Tag.create(args);
};

const modifyTag = async (_, args) => {
  return Tag.findByIdAndUpdate(args.id, args, { new: true }).populate('recipes');
};

const deleteTag = async (_, args) => {
  //Delete tag
  //TODO: (if implemented) Delete tag from list
  //Delete tag from recipes
  const tag = await Tag.findByIdAndDelete(args.id);
  for await (const recipe of tag.recipes) {
    await Recipe.findByIdAndUpdate(recipe, {
      $pull: { tags: tag.id },
    });
  }
  return `${tag.name} deleted`;
};

module.exports = {
  createTag,
  modifyTag,
  deleteTag,
};
