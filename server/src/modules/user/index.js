const { gql } = require('apollo-server-express');

const typeDefs = gql`
  extend type Query {
    getUser(id: ID!): User
    getUsers(searchTerm: String!): [User]
  }

  extend type Mutation {
    updateUser(user: UserInput!): User @isAuthenticated
    deleteUser(id: ID!): String @isAuthenticated
    createAdmin(id: ID!, isAdmin: Boolean!): User @isAdmin
  }

  input UserInput {
    id: ID
    email: String
    firstName: String
    lastName: String
    password: String
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
