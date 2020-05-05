const { getCategories, getCategory } = require('./categoryQueries');
const { createCategory, deleteCategory, modifyCategory } = require('./categoryMutations');

const resolvers = {
  Query: {
    getCategories,
    getCategory,
  },
  Mutation: {
    createCategory,
    deleteCategory,
    modifyCategory,
  },
};

module.exports = resolvers;
