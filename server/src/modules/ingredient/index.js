/*
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  extend type Query {
    getIngredient(id: String!): Ingredient
    getIngredients(searchTerm: String): [Ingredient]
    getUnits(searchTerm: String): [Unit]
    getUnit(id: String!): Unit
  }

  extend type Mutation {
    createIngredient(name: String): Ingredient @isAuthenticated
    modifyIngredient(id: String!, name: String): Ingredient @isAuthenticated
    deleteIngredient(id: String!): String @isAuthenticated
    createUnit(name: String!, symbol: String!, class: Class!, metric: Boolean!, factor: Float!): Unit @isAuthenticated
    modifyUnit(id: String!, name: String, class: Class, metric: Boolean, factor: Float): Unit @isAuthenticated
    deleteUnit(id: String!): String @isAuthenticated
  }

  type Ingredient {
    id: String!
    name: String!
  }

  type Unit {
    id: String!
    name: String!
    symbol: String!
    class: Class!
    metric: Boolean
    factor: Float!
  }

  enum Class {
    MASS
    VOLUME
    DISTANCE
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
*/
