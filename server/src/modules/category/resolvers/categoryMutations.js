const Category = require('../../../models/category');
const Recipe = require('../../../models/recipe');

const createCategory = async (_, args) => {
  console.log(args);
  const cat = await Category.create(args);
  console.log(cat);
  return {
    ...cat._doc,
    id: cat.id,
  };
};

const modifyCategory = async (_, args) => {
  console.log(args);
  const cat = await Category.findByIdAndUpdate(args.id, args);
  return {
    ...cat._doc,
    id: cat.id,
  };
};

const deleteCategory = async (_, args) => {
  //Delete category
  //TODO: (if implemented) Delete category from list
  //Delete category from recipes
  const cat = await Category.findByIdAndDelete(args.id);
  for await (const recipe of cat.recipes) {
    await Recipe.findByIdAndUpdate(recipe, {
      $pull: { categories: cat.id },
    });
  }
  return `${cat.name} deleted`;
};

module.exports = {
  createCategory,
  modifyCategory,
  deleteCategory,
};
