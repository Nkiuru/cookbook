const { gql } = require('apollo-server-express');

//TODO: Implement list CRUD & add recipe to list resolvers & list type
const typeDefs = gql`
  extend type Query {

  }

  extend type Mutation {

  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
