const { gql } = require('apollo-server-express');

//TODO: Implement tag CRUD resolvers & tag type
const typeDefs = gql`
  extend type Query {
    getTags(searchTerm: String): [Tag]
    getTag(id: String!): Tag
  }

  extend type Mutation {
    createTag(name: String!, recipes: [String]): Tag @isAuthenticated
    modifyTag(id: String!, name: String, recipes: [String]): Tag @isAuthenticated
    deleteTag(id: String!): String @isAuthenticated
  }

  type Tag {
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
