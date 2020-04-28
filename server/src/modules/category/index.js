const { gql } = require('apollo-server-express');

const typeDefs = gql`
  extend type Query {
    getCategories: [Category]
    getCategory(id: ID!): Category
  }

  extend type Mutation {
    createCategory(name: String!): Category @isAuthenticated
    modifyCategory(id: ID!, name: String!): Category @isAuthenticated
    deleteCategory(id: ID!): String @isAuthenticated
  }

  type Category {
    _id: ID!
    name: String!
    recipes: [Recipe]
  }

  input CategoryInput {
    name: String!
    recipes: [String]
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
