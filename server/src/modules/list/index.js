const { gql } = require('apollo-server-express');

//TODO: Implement list CRUD & add recipe to list resolvers & list type
const typeDefs = gql`
  extend type Query {
    getLists(searchTerm: String): [List]
    getList(id: String!): List
  }

  extend type Mutation {
    createList(name: String!, tags: [String], categories: [String], recipes: [String]): List
    modifyList(id: String!, name: String, tags: [String], categories: [String], recipes: [String]): List
    deleteList(id: String!): String
    addRecipeToList(id: String!, recipe: String!): ListData
    addTagToList(id: String, tag: String!): ListData
    addCategoryToList(id: String, category: String!): ListData
  }

  type ListData {
    list: List
    message: String!
    success: Boolean!
  }

  type List {
    id: String!
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
