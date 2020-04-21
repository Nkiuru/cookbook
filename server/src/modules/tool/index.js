const { gql } = require('apollo-server-express');
//TODO: Implement tool CRUD resolvers & tool type
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
