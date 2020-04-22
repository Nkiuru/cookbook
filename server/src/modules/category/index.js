const { gql } = require('apollo-server-express');

//TODO: Implement category CRUD resolvers & category type
const typeDefs = gql`
  extend type Query {
    getCategories: [Category]
    getCategory(id: String!): Category
    getRecipesByCategory(id: String!): [Recipe]
  }

  extend type Mutation {
    createCategory(name: String!): Category @isAuthenticated
    modifyCategory(id: String!, name: String!): Category @isAuthenticated
    deleteCategory(id: String!): String @isAuthenticated
  }

  type Category {
    name: String!
    recipes: [Recipe]
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
