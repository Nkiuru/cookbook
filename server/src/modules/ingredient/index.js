const { gql } = require('apollo-server-express');

//TODO: Implement ingredient CRUD resolvers & ingredient type
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
