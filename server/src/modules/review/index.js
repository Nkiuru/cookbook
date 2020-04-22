const { gql } = require('apollo-server-express');

//TODO: Implement review CRUD resolvers & review type
const typeDefs = gql`
  type Review {
    user: User!
    recipe: Recipe!
    content: String!
    created: DateTime
    updateAt: DateTime
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
