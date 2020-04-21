const { gql } = require('apollo-server-express');

//TODO: Implement tag CRUD resolvers & tag type
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
