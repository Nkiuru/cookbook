const { gql } = require('apollo-server-express');

//TODO: Implement tag CRUD resolvers & tag type
const typeDefs = gql`
  type Tag {
    name: String!
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
