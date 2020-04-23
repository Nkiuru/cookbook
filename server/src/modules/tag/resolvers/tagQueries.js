const Tag = require('../../../models/tag');

const getTags = async () => {
  return Tag.find({}).populate('recipes');
};

const getTag = async (_, args) => {
  return Tag.findById(args.id).populate('recipes');
};

module.exports = {
  getTags,
  getTag,
};
