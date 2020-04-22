const { gql } = require('apollo-server-express');
//TODO: Implement tool CRUD resolvers & tool type
const typeDefs = gql`
  type Tool {
    name: String!
    image: String
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
