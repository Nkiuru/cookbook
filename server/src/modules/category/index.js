const { gql } = require('apollo-server-express');

//TODO: Implement category CRUD resolvers & category type
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
