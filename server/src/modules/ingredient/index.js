const { gql } = require('apollo-server-express');

//TODO: Implement ingredient CRUD resolvers & ingredient type
const typeDefs = gql`
  type Ingredient {
    name: String!
  }

  type Unit {
    name: String!
    class: Class!
    metric: Boolean
    factor: Float!
  }

  enum Class {
    MASS
    VOLUME
    DISTANCE
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
