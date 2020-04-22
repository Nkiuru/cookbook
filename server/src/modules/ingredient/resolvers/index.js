const { getIngredients, getIngredient } = require('./ingredientQueries');
const { createIngredient, modifyIngredient, deleteIngredient } = require('./ingredientMutations');

const resolvers = {
  Query: {
    getIngredient,
    getIngredients,
  },
  Mutation: {
    createIngredient,
    modifyIngredient,
    deleteIngredient,
  },
};

module.exports = resolvers;
