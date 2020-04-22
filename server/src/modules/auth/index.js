const { gql } = require('apollo-server-express');

const typeDefs = gql`
  extend type Query {
    me: User @isAuthenticated
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthData

    signup(email: String!, password: String!, firstName: String!, lastName: String!): User
  }

  type AuthData {
    user: User
    token: String!
    tokenExpiration: String!
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    fullName: String!
    created: DateTime!
    lastActive: DateTime!
    changed: DateTime!
    lists: [List]
    followedLists: [List]
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
