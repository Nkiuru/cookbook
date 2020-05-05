const { getIngredients, getIngredient } = require('./ingredientQueries');
const { createIngredient, modifyIngredient, deleteIngredient } = require('./ingredientMutations');
const { getUnits, getUnit } = require('./unitQueries');
const { createUnit, modifyUnit, deleteUnit } = require('./unitMutations');

const resolvers = {
  Query: {
    getIngredient,
    getIngredients,
    getUnit,
    getUnits,
  },
  Mutation: {
    createIngredient,
    modifyIngredient,
    deleteIngredient,
    createUnit,
    modifyUnit,
    deleteUnit,
  },
};

module.exports = resolvers;
