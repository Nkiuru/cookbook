const { gql } = require('apollo-server-express');

//TODO: Implement list CRUD & add recipe to list resolvers & list type
const typeDefs = gql`
  extend type Query {
    getLists(searchTerm: String): [List]
    getList(id: ID!): List
    getMyLists: [List] @isAuthenticated
  }

  extend type Mutation {
    createList(name: String!, description: String!, tags: [ID], categories: [ID], recipes: [ID]): List @isAuthenticated
    modifyList(id: ID!, name: String, description: String, tags: [ID], categories: [ID], recipes: [ID]): List
      @isAuthenticated
    deleteList(id: ID!): String @isAuthenticated
    addRecipeToList(id: ID!, recipe: ID!): List @isAuthenticated
    addTagToList(id: ID!, tag: ID!): List @isAuthenticated
    addCategoryToList(id: ID!, category: ID!): List @isAuthenticated
  }

  type List {
    id: ID!
    name: String!
    description: String
    owner: User!
    tags: [Tag]
    categories: [Category]
    recipes: [Recipe]
    followers: [User]
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
