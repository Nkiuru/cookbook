const { gql } = require('apollo-server-express');

const typeDefs = gql`
  extend type Query {
    getCategories: [Category]
    getCategory(id: String!): Category
  }

  extend type Mutation {
    createCategory(name: String!): Category @isAuthenticated
    modifyCategory(id: String!, name: String!): Category @isAuthenticated
    deleteCategory(id: String!): String @isAuthenticated
  }

  type Category {
    id: String!
    name: String!
    recipes: [Recipe]
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
