const { gql } = require('apollo-server-express');

//TODO: Implement list CRUD & add recipe to list resolvers & list type
const typeDefs = gql`
  extend type Query {
    getLists(searchTerm: String): [List]
    getList(id: ID!): List
  }

  extend type Mutation {
    createList(name: String!, tags: [ID], categories: [ID], recipes: [ID]): List
    modifyList(id: ID!, name: String, tags: [ID], categories: [ID], recipes: [ID]): List
    deleteList(id: ID!): String
    addRecipeToList(id: ID!, recipe: ID!): List
    addTagToList(id: ID!, tag: ID!): List
    addCategoryToList(id: ID! category: ID!): List
  }

  type List {
    id: ID!
    name: String!
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
