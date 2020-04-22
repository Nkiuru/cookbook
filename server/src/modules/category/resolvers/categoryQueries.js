const Category = require('../../../models/category');

const getCategories = async () => {
  return await Category.find({});
};

const getCategory = async (_, args) => {
  console.log(args);
  return await Category.findById(args.id);
};

module.exports = {
  getCategories,
  getCategory,
};
