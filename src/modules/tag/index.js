const { gql } = require('apollo-server-express');

//TODO: Implement tag CRUD resolvers & tag type
const typeDefs = gql`
  extend type Query {
    getTags(searchTerm: String): [Tag]
    getTag(id: ID!): Tag
  }

  extend type Mutation {
    createTag(name: String!, recipes: [ID]): Tag @isAuthenticated
    modifyTag(id: ID!, name: String, recipes: [ID]): Tag @isAuthenticated
    deleteTag(id: ID!): String @isAuthenticated
  }

  type Tag {
    _id: ID!
    name: String!
    recipes: [Recipe]
  }

  input TagInput {
    name: String!
    recipes: [String]
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
